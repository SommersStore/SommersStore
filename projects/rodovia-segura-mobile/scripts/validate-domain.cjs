const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const seed = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mobileSeed.json'), 'utf8'));

const globalRoles = new Set(['admin', 'leaderSupervisor']);
const regionalRoles = new Set(['regionalSupervisor', 'supportSupervisor']);
const postRoles = new Set(['postGuard', 'armedSecurity']);

function visiblePostsForUser(user) {
  if (globalRoles.has(user.role)) return seed.posts;
  if (regionalRoles.has(user.role)) return seed.posts.filter(post => post.regionId === user.regionId);
  if (postRoles.has(user.role)) return seed.posts.filter(post => post.id === user.postId);
  return [];
}

function hasMinimumCheckInPhotos(evidence) {
  return evidence.filter(item => item.type === 'image').length >= seed.mvpRules.minimumCheckInPhotos;
}

assert.equal(seed.regions.length, 2, 'MVP must expose two canonical regions');
assert.equal(seed.posts.length, 12, 'MVP must expose twelve posts');
assert.equal(seed.posts.filter(post => post.regionId === 'norte').length, 6, 'Norte must have six posts');
assert.equal(seed.posts.filter(post => post.regionId === 'leste').length, 6, 'Leste must have six posts');
assert.equal(seed.mvpRules.minimumCheckInPhotos, 2, 'Check-in must require two photos');

const usersByRole = new Map(seed.demoUsers.map(user => [user.role, user]));
for (const role of ['postGuard', 'armedSecurity', 'regionalSupervisor', 'supportSupervisor', 'leaderSupervisor', 'admin']) {
  assert.ok(usersByRole.has(role), `Missing demo user for role ${role}`);
}

assert.deepEqual(
  visiblePostsForUser(usersByRole.get('postGuard')).map(post => post.id),
  ['posto-01'],
  'Post guard must only see own post'
);
assert.deepEqual(
  visiblePostsForUser(usersByRole.get('regionalSupervisor')).map(post => post.regionId),
  ['norte', 'norte', 'norte', 'norte', 'norte', 'norte'],
  'Regional supervisor must only see own region'
);
assert.equal(visiblePostsForUser(usersByRole.get('leaderSupervisor')).length, 12, 'Leader supervisor must see all posts');
assert.equal(visiblePostsForUser(usersByRole.get('admin')).length, 12, 'Admin must see all posts');

assert.equal(hasMinimumCheckInPhotos([{ type: 'image' }]), false, 'One photo must not complete check-in');
assert.equal(hasMinimumCheckInPhotos([{ type: 'image' }, { type: 'image' }]), true, 'Two photos must complete check-in');

console.log('Rodovia Segura domain validation passed.');
