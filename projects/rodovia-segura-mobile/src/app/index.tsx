import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  activeAttendanceForUser,
  closeAttendanceRecord,
  createAttendanceRecord,
  createEvidence,
  createOccurrence,
  currentShiftLabel,
  findPost,
  findRegionName,
  hasMinimumCheckInPhotos,
  MOBILE_SEED,
  openOccurrencesForPosts,
} from '@/domain/operations';
import { isPostUser, roleDisplayName, scopeDisplayName, visiblePostsForUser } from '@/domain/permissions';
import type {
  AttendanceRecord,
  DemoUser,
  EvidenceFile,
  GeoPoint,
  OccurrenceRecord,
  OccurrenceSeverity,
  Post,
} from '@/domain/types';
import { firebaseMode } from '@/services/firebase';

const OCCURRENCE_TYPES = ['Ronda', 'Acesso', 'Veiculo', 'Clima', 'Outro'];
const SEVERITIES: OccurrenceSeverity[] = ['baixa', 'media', 'alta', 'critica'];

export default function HomeScreen() {
  const [activeUser, setActiveUser] = useState<DemoUser | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [occurrences, setOccurrences] = useState<OccurrenceRecord[]>([]);
  const [checkInPhotos, setCheckInPhotos] = useState<EvidenceFile[]>([]);
  const [occurrenceEvidence, setOccurrenceEvidence] = useState<EvidenceFile[]>([]);
  const [checkInNote, setCheckInNote] = useState('');
  const [checkOutNote, setCheckOutNote] = useState('');
  const [occurrenceType, setOccurrenceType] = useState(OCCURRENCE_TYPES[0]);
  const [occurrenceSeverity, setOccurrenceSeverity] = useState<OccurrenceSeverity>('media');
  const [occurrenceDescription, setOccurrenceDescription] = useState('');
  const [view, setView] = useState<'home' | 'checkin' | 'checkout' | 'occurrence' | 'history'>('home');

  const visiblePosts = useMemo(
    () => (activeUser ? visiblePostsForUser(activeUser, MOBILE_SEED.posts) : []),
    [activeUser]
  );
  const activePost = activeUser?.postId ? findPost(activeUser.postId) ?? null : visiblePosts[0] ?? null;
  const activeRecord = activeUser ? activeAttendanceForUser(activeUser.id, records) : null;
  const scopedOccurrences = openOccurrencesForPosts(visiblePosts, occurrences);

  async function addPickedImage(target: 'checkin' | 'occurrence') {
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const result = cameraPermission.granted
        ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.72 })
        : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.72 });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const evidence = createEvidence(result.assets[0].uri, target === 'checkin' ? 'Foto entrada' : 'Evidencia');
        if (target === 'checkin') setCheckInPhotos(current => [...current, evidence]);
        if (target === 'occurrence') setOccurrenceEvidence(current => [...current, evidence]);
      }
    } catch {
      Alert.alert('Camera indisponivel', 'Use a evidencia demo para continuar o teste local.');
    }
  }

  async function readLocation(): Promise<GeoPoint | null> {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) return null;
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        capturedAt: new Date().toISOString(),
      };
    } catch {
      return null;
    }
  }

  function addDemoEvidence(target: 'checkin' | 'occurrence') {
    const evidence = createEvidence(`demo://${target}/${Date.now()}`, target === 'checkin' ? 'Foto demo' : 'Evidencia demo', true);
    if (target === 'checkin') setCheckInPhotos(current => [...current, evidence]);
    if (target === 'occurrence') setOccurrenceEvidence(current => [...current, evidence]);
  }

  async function submitCheckIn() {
    if (!activeUser || !activePost) return;
    if (!hasMinimumCheckInPhotos(checkInPhotos)) {
      Alert.alert('Fotos obrigatorias', `Inclua ${MOBILE_SEED.mvpRules.minimumCheckInPhotos} fotos para registrar entrada.`);
      return;
    }
    const geo = await readLocation();
    const record = createAttendanceRecord({
      user: activeUser,
      post: activePost,
      note: checkInNote,
      photos: checkInPhotos,
      geo,
    });
    setRecords(current => [record, ...current]);
    setCheckInPhotos([]);
    setCheckInNote('');
    setView('home');
  }

  function submitCheckOut() {
    if (!activeRecord) return;
    setRecords(current =>
      current.map(record => (record.id === activeRecord.id ? closeAttendanceRecord(record, checkOutNote) : record))
    );
    setCheckOutNote('');
    setView('home');
  }

  function submitOccurrence() {
    if (!activeUser || !activePost || !occurrenceDescription.trim()) {
      Alert.alert('Ocorrencia incompleta', 'Informe a descricao antes de registrar.');
      return;
    }
    const occurrence = createOccurrence({
      user: activeUser,
      post: activePost,
      type: occurrenceType,
      severity: occurrenceSeverity,
      description: occurrenceDescription,
      evidence: occurrenceEvidence,
    });
    setOccurrences(current => [occurrence, ...current]);
    setOccurrenceDescription('');
    setOccurrenceEvidence([]);
    setOccurrenceType(OCCURRENCE_TYPES[0]);
    setOccurrenceSeverity('media');
    setView('home');
  }

  if (!activeUser) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>MVP mobile</Text>
            <Text style={styles.title}>Rodovia Segura</Text>
            <Text style={styles.subtitle}>Login demonstrativo por cargo, posto e regiao.</Text>
          </View>

          <View style={styles.grid}>
            {MOBILE_SEED.demoUsers.map(user => (
              <Pressable key={user.id} style={styles.userCard} onPress={() => setActiveUser(user)}>
                <Text style={styles.cardTitle}>{user.displayName}</Text>
                <Text style={styles.cardMeta}>{roleDisplayName(user.role)}</Text>
                <Text style={styles.scope}>{scopeDisplayName(user)}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.eyebrow}>{firebaseMode === 'firebase-ready' ? 'Firebase pronto' : 'Modo demo local'}</Text>
              <Text style={styles.title}>{activeUser.displayName}</Text>
              <Text style={styles.subtitle}>
                {roleDisplayName(activeUser.role)} - {scopeDisplayName(activeUser)}
              </Text>
            </View>
            <Pressable style={styles.exitButton} onPress={() => setActiveUser(null)}>
              <Text style={styles.exitText}>Sair</Text>
            </Pressable>
          </View>

          <View style={styles.segment}>
            {(['home', 'history'] as const).map(item => (
              <Pressable key={item} style={[styles.segmentButton, view === item && styles.segmentButtonActive]} onPress={() => setView(item)}>
                <Text style={[styles.segmentText, view === item && styles.segmentTextActive]}>{item === 'home' ? 'Operacao' : 'Historico'}</Text>
              </Pressable>
            ))}
          </View>

          {isPostUser(activeUser) && activePost ? (
            <>
              {view === 'home' && renderPostHome(activeUser, activePost, activeRecord, scopedOccurrences)}
              {view === 'checkin' && renderCheckIn()}
              {view === 'checkout' && renderCheckOut()}
              {view === 'occurrence' && renderOccurrence()}
              {view === 'history' && renderHistory(visiblePosts)}
            </>
          ) : (
            <>
              {view === 'history' ? renderHistory(visiblePosts) : renderSupervisorHome(activeUser, visiblePosts, scopedOccurrences)}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );

  function renderPostHome(user: DemoUser, post: Post, record: AttendanceRecord | null, openItems: OccurrenceRecord[]) {
    const status = record ? 'Em servico' : 'Aguardando entrada';
    return (
      <View style={styles.stack}>
        <View style={styles.statusPanel}>
          <Text style={styles.statusLabel}>{status}</Text>
          <Text style={styles.statusPost}>
            {post.name} - {findRegionName(post.regionId)}
          </Text>
          <Text style={styles.cardMeta}>{currentShiftLabel(user)}</Text>
        </View>

        <View style={styles.actionGrid}>
          <ActionButton label="Registrar entrada" disabled={Boolean(record)} onPress={() => setView('checkin')} tone="success" />
          <ActionButton label="Nova ocorrencia" onPress={() => setView('occurrence')} tone="warning" />
          <ActionButton label="Registrar saida" disabled={!record} onPress={() => setView('checkout')} tone="primary" />
        </View>

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Ocorrencias abertas</Text>
          {openItems.length === 0 ? <Text style={styles.emptyText}>Nenhuma ocorrencia aberta no escopo.</Text> : openItems.map(renderOccurrenceRow)}
        </View>
      </View>
    );
  }

  function renderSupervisorHome(user: DemoUser, posts: Post[], openItems: OccurrenceRecord[]) {
    const coveredPosts = posts.filter(post => records.some(record => record.postId === post.id && record.status === 'in_service'));
    return (
      <View style={styles.stack}>
        <View style={styles.metrics}>
          <Metric label="Postos" value={String(posts.length)} />
          <Metric label="Cobertos" value={String(coveredPosts.length)} />
          <Metric label="Pendentes" value={String(posts.length - coveredPosts.length)} />
          <Metric label="Ocorrencias" value={String(openItems.length)} />
        </View>

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>
            {roleDisplayName(user.role)} - {scopeDisplayName(user)}
          </Text>
          {posts.map(post => {
            const hasCoverage = coveredPosts.some(item => item.id === post.id);
            const postOccurrences = openItems.filter(item => item.postId === post.id);
            return (
              <View key={post.id} style={styles.postRow}>
                <View>
                  <Text style={styles.cardTitle}>
                    {post.code} - {post.name}
                  </Text>
                  <Text style={styles.cardMeta}>{findRegionName(post.regionId)}</Text>
                </View>
                <Text style={[styles.badge, hasCoverage ? styles.badgeSuccess : styles.badgeWarning]}>
                  {hasCoverage ? 'Coberto' : 'Pendente'} {postOccurrences.length ? `+${postOccurrences.length}` : ''}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  function renderCheckIn() {
    return (
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>Registrar entrada</Text>
        <EvidenceStrip evidence={checkInPhotos} minimum={MOBILE_SEED.mvpRules.minimumCheckInPhotos} />
        <View style={styles.row}>
          <ActionButton label="Camera" onPress={() => addPickedImage('checkin')} tone="primary" />
          <ActionButton label="Foto demo" onPress={() => addDemoEvidence('checkin')} tone="muted" />
        </View>
        <TextInput
          value={checkInNote}
          onChangeText={setCheckInNote}
          placeholder="Observacao inicial"
          placeholderTextColor={colors.muted}
          multiline
          style={styles.input}
        />
        <ActionButton label="Concluir entrada" onPress={submitCheckIn} tone="success" disabled={!hasMinimumCheckInPhotos(checkInPhotos)} />
      </View>
    );
  }

  function renderCheckOut() {
    return (
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>Registrar saida</Text>
        <TextInput
          value={checkOutNote}
          onChangeText={setCheckOutNote}
          placeholder="Observacao final"
          placeholderTextColor={colors.muted}
          multiline
          style={styles.input}
        />
        <ActionButton label="Encerrar turno" onPress={submitCheckOut} tone="primary" />
      </View>
    );
  }

  function renderOccurrence() {
    return (
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>Nova ocorrencia</Text>
        <OptionRow values={OCCURRENCE_TYPES} active={occurrenceType} onChange={setOccurrenceType} />
        <OptionRow values={SEVERITIES} active={occurrenceSeverity} onChange={setOccurrenceSeverity} />
        <TextInput
          value={occurrenceDescription}
          onChangeText={setOccurrenceDescription}
          placeholder="Descricao da ocorrencia"
          placeholderTextColor={colors.muted}
          multiline
          style={styles.input}
        />
        <EvidenceStrip evidence={occurrenceEvidence} />
        <View style={styles.row}>
          <ActionButton label="Camera" onPress={() => addPickedImage('occurrence')} tone="primary" />
          <ActionButton label="Evidencia demo" onPress={() => addDemoEvidence('occurrence')} tone="muted" />
        </View>
        <ActionButton label="Registrar ocorrencia" onPress={submitOccurrence} tone="warning" />
      </View>
    );
  }

  function renderHistory(posts: Post[]) {
    const postIds = new Set(posts.map(post => post.id));
    const scopedRecords = records.filter(record => postIds.has(record.postId));
    const scopedHistory = occurrences.filter(item => postIds.has(item.postId));
    return (
      <View style={styles.stack}>
        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Presencas</Text>
          {scopedRecords.length === 0 ? (
            <Text style={styles.emptyText}>Sem registros locais.</Text>
          ) : (
            scopedRecords.map(record => (
              <View key={record.id} style={styles.historyRow}>
                <Text style={styles.cardTitle}>
                  {findPost(record.postId)?.code} - {record.status === 'in_service' ? 'Em servico' : 'Encerrado'}
                </Text>
                <Text style={styles.cardMeta}>
                  {new Date(record.checkInAtDevice).toLocaleString()} - {record.checkInPhotos.length} fotos
                </Text>
              </View>
            ))
          )}
        </View>
        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Ocorrencias</Text>
          {scopedHistory.length === 0 ? <Text style={styles.emptyText}>Sem ocorrencias locais.</Text> : scopedHistory.map(renderOccurrenceRow)}
        </View>
      </View>
    );
  }

  function renderOccurrenceRow(item: OccurrenceRecord) {
    return (
      <View key={item.id} style={styles.historyRow}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardMeta}>
          {item.severity} - {item.description}
        </Text>
      </View>
    );
  }
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function ActionButton({
  label,
  onPress,
  disabled,
  tone,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  tone: 'primary' | 'success' | 'warning' | 'muted';
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.actionButton, styles[`button_${tone}`], disabled && styles.disabledButton]}>
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

function OptionRow<T extends string>({ values, active, onChange }: { values: T[]; active: T; onChange: (value: T) => void }) {
  return (
    <View style={styles.optionRow}>
      {values.map(value => (
        <Pressable key={value} style={[styles.option, active === value && styles.optionActive]} onPress={() => onChange(value)}>
          <Text style={[styles.optionText, active === value && styles.optionTextActive]}>{value}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function EvidenceStrip({ evidence, minimum }: { evidence: EvidenceFile[]; minimum?: number }) {
  return (
    <View style={styles.evidencePanel}>
      <Text style={styles.cardMeta}>
        Evidencias {evidence.length}
        {minimum ? `/${minimum}` : ''}
      </Text>
      <View style={styles.evidenceRow}>
        {evidence.map(item => (
          <View key={item.id} style={styles.thumb}>
            {item.demo ? <Text style={styles.thumbText}>DEMO</Text> : <Image source={{ uri: item.uri }} style={styles.thumbImage} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const colors = {
  background: '#0f172a',
  surface: '#111827',
  surfaceSoft: '#1f2937',
  line: '#334155',
  primary: '#2563eb',
  success: '#16a34a',
  warning: '#f59e0b',
  text: '#f8fafc',
  muted: '#94a3b8',
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  safeArea: { backgroundColor: colors.background, flex: 1 },
  page: { gap: 16, padding: 16, paddingBottom: 32 },
  hero: { gap: 8, paddingVertical: 18 },
  header: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  headerText: { flex: 1, gap: 4 },
  eyebrow: { color: colors.warning, fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  title: { color: colors.text, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  grid: { gap: 10 },
  userCard: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 8, borderWidth: 1, gap: 4, padding: 14 },
  cardTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  cardMeta: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  scope: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 8,
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  exitButton: { backgroundColor: colors.surfaceSoft, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  exitText: { color: colors.text, fontSize: 12, fontWeight: '800' },
  segment: { backgroundColor: colors.surface, borderRadius: 8, flexDirection: 'row', padding: 4 },
  segmentButton: { alignItems: 'center', borderRadius: 7, flex: 1, paddingVertical: 10 },
  segmentButtonActive: { backgroundColor: colors.primary },
  segmentText: { color: colors.muted, fontSize: 12, fontWeight: '900' },
  segmentTextActive: { color: colors.text },
  stack: { gap: 14 },
  statusPanel: { backgroundColor: colors.surface, borderColor: colors.success, borderRadius: 8, borderWidth: 1, gap: 6, padding: 16 },
  statusLabel: { color: colors.success, fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  statusPost: { color: colors.text, fontSize: 22, fontWeight: '900' },
  actionGrid: { gap: 10 },
  actionButton: { alignItems: 'center', borderRadius: 8, justifyContent: 'center', minHeight: 48, paddingHorizontal: 14, paddingVertical: 12 },
  actionText: { color: colors.text, fontSize: 14, fontWeight: '900' },
  button_primary: { backgroundColor: colors.primary },
  button_success: { backgroundColor: colors.success },
  button_warning: { backgroundColor: colors.warning },
  button_muted: { backgroundColor: colors.surfaceSoft },
  disabledButton: { opacity: 0.38 },
  panel: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 8, borderWidth: 1, gap: 12, padding: 14 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '900' },
  emptyText: { color: colors.muted, fontSize: 13 },
  row: { flexDirection: 'row', gap: 10 },
  input: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    minHeight: 88,
    padding: 12,
    textAlignVertical: 'top',
  },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: { backgroundColor: colors.surfaceSoft, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  optionActive: { backgroundColor: colors.primary },
  optionText: { color: colors.muted, fontSize: 12, fontWeight: '800', textTransform: 'capitalize' },
  optionTextActive: { color: colors.text },
  evidencePanel: { gap: 8 },
  evidenceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, minHeight: 52 },
  thumb: { alignItems: 'center', backgroundColor: colors.surfaceSoft, borderRadius: 8, height: 52, justifyContent: 'center', overflow: 'hidden', width: 52 },
  thumbImage: { height: 52, width: 52 },
  thumbText: { color: colors.warning, fontSize: 10, fontWeight: '900' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metricCard: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 8, borderWidth: 1, flexBasis: '47%', flexGrow: 1, padding: 12 },
  metricValue: { color: colors.text, fontSize: 24, fontWeight: '900' },
  metricLabel: { color: colors.muted, fontSize: 12, fontWeight: '800' },
  postRow: { alignItems: 'center', borderTopColor: colors.line, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 },
  badge: { borderRadius: 8, color: colors.text, fontSize: 11, fontWeight: '900', overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 5 },
  badgeSuccess: { backgroundColor: colors.success },
  badgeWarning: { backgroundColor: colors.warning },
  historyRow: { borderTopColor: colors.line, borderTopWidth: 1, gap: 4, paddingTop: 10 },
});
