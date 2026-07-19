import type { DemoUser, Post, RoleId } from './types';

const GLOBAL_ROLES = new Set<RoleId>(['admin', 'leaderSupervisor']);
const REGIONAL_ROLES = new Set<RoleId>(['regionalSupervisor', 'supportSupervisor']);
const POST_ROLES = new Set<RoleId>(['postGuard', 'armedSecurity']);

export function isPostUser(user: DemoUser) {
  return POST_ROLES.has(user.role);
}

export function isRegionalUser(user: DemoUser) {
  return REGIONAL_ROLES.has(user.role);
}

export function isGlobalUser(user: DemoUser) {
  return GLOBAL_ROLES.has(user.role);
}

export function visiblePostsForUser(user: DemoUser, posts: Post[]) {
  if (isGlobalUser(user)) return posts;
  if (isRegionalUser(user) && user.regionId) {
    return posts.filter(post => post.regionId === user.regionId);
  }
  if (isPostUser(user) && user.postId) {
    return posts.filter(post => post.id === user.postId);
  }
  return [];
}

export function roleDisplayName(role: RoleId) {
  const labels: Record<RoleId, string> = {
    admin: 'Admin',
    leaderSupervisor: 'Supervisor lider',
    regionalSupervisor: 'Supervisor regional',
    supportSupervisor: 'Supervisor apoio',
    postGuard: 'Vigilante',
    armedSecurity: 'Seguranca armado',
  };
  return labels[role];
}

export function scopeDisplayName(user: DemoUser) {
  if (isGlobalUser(user)) return 'Norte + Leste';
  if (isRegionalUser(user)) return user.regionId === 'leste' ? 'Regiao Leste' : 'Regiao Norte';
  return user.postId ? `Posto ${user.postId.replace('posto-', '').padStart(2, '0')}` : 'Posto';
}
