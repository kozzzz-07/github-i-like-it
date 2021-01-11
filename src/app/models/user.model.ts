import firebase from 'firebase/app';

export type User = Partial<Pick<firebase.UserInfo, 'displayName' | 'photoURL'>>;
