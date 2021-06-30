export interface MembershipObj {
  membershipType: number;
  membershipId: string;
}

export interface GenericResponse {
  Response: any;
  ErrorCode: number;
  ErrorStatus: string;
  Message: string;
}

export interface Character {
  membershipId: string
  membershipType: number
  characterId: string
  dateLastPlayed: string
  minutesPlayedThisSession: string
  minutesPlayedTotal: string
  light: number
  stats: Stats
  raceHash: number
  genderHash: number
  classHash: number
  raceType: number
  classType: number
  genderType: number
  emblemPath: string
  emblemBackgroundPath: string
  emblemHash: number
  emblemColor: EmblemColor
  levelProgression: LevelProgression
  baseCharacterLevel: number
  percentToNextLevel: number
  titleRecordHash: number
}

export interface Stats {
  144602215: number
  392767087: number
  1735777505: number
  1935470627: number
  1943323491: number
  2996146975: number
  4244567218: number
}

export interface EmblemColor {
  red: number
  green: number
  blue: number
  alpha: number
}

export interface LevelProgression {
  progressionHash: number
  dailyProgress: number
  dailyLimit: number
  weeklyProgress: number
  weeklyLimit: number
  currentProgress: number
  level: number
  levelCap: number
  stepIndex: number
  progressToNextLevel: number
  nextLevelAt: number
}