import seed from '@/data/mobileSeed.json';

import type {
  AttendanceRecord,
  DemoUser,
  EvidenceFile,
  GeoPoint,
  MobileSeed,
  OccurrenceRecord,
  OccurrenceSeverity,
  Post,
} from './types';

export const MOBILE_SEED = seed as MobileSeed;

export function findPost(postId: string) {
  return MOBILE_SEED.posts.find(post => post.id === postId);
}

export function findRegionName(regionId: string) {
  return MOBILE_SEED.regions.find(region => region.id === regionId)?.name ?? regionId;
}

export function currentShiftLabel(user: DemoUser) {
  const team = MOBILE_SEED.teams.find(item => item.id === user.teamId);
  if (!team) return 'Turno 12x36';
  return `${team.name} - ${team.shiftKind === 'day' ? 'Diurno' : 'Noturno'} 12x36`;
}

export function hasMinimumCheckInPhotos(evidence: EvidenceFile[]) {
  return evidence.filter(item => item.type === 'image').length >= MOBILE_SEED.mvpRules.minimumCheckInPhotos;
}

export function createEvidence(uri: string, label: string, demo = false): EvidenceFile {
  return {
    id: `ev-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    uri,
    type: 'image',
    label,
    capturedAt: new Date().toISOString(),
    demo,
  };
}

export function createAttendanceRecord(params: {
  user: DemoUser;
  post: Post;
  note: string;
  photos: EvidenceFile[];
  geo: GeoPoint | null;
}): AttendanceRecord {
  return {
    id: `att-${Date.now()}`,
    userId: params.user.id,
    postId: params.post.id,
    regionId: params.post.regionId,
    teamId: params.user.teamId,
    roleAtShift: params.user.role,
    checkInAtDevice: new Date().toISOString(),
    checkInGeo: params.geo,
    checkInPhotos: params.photos,
    checkInNote: params.note.trim(),
    status: 'in_service',
  };
}

export function closeAttendanceRecord(record: AttendanceRecord, note: string): AttendanceRecord {
  return {
    ...record,
    checkOutAtDevice: new Date().toISOString(),
    checkOutNote: note.trim(),
    status: 'closed',
  };
}

export function activeAttendanceForUser(userId: string, records: AttendanceRecord[]) {
  return records.find(record => record.userId === userId && record.status === 'in_service') ?? null;
}

export function createOccurrence(params: {
  user: DemoUser;
  post: Post;
  type: string;
  severity: OccurrenceSeverity;
  description: string;
  evidence: EvidenceFile[];
}): OccurrenceRecord {
  return {
    id: `occ-${Date.now()}`,
    title: `${params.type} - ${params.post.code}`,
    description: params.description.trim(),
    type: params.type,
    severity: params.severity,
    regionId: params.post.regionId,
    postId: params.post.id,
    createdBy: params.user.id,
    evidence: params.evidence,
    status: 'aberta',
    createdAt: new Date().toISOString(),
  };
}

export function openOccurrencesForPosts(posts: Post[], occurrences: OccurrenceRecord[]) {
  const postIds = new Set(posts.map(post => post.id));
  return occurrences.filter(item => item.status !== 'resolvida' && item.status !== 'cancelada' && postIds.has(item.postId));
}
