import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setAuthData(token, user) {
      this.token = token;
      this.user = user;
    },
    clearAuthData() {
      this.token = null;
      this.user = null;
    },
  },
  persist: true,
});

export const useArtistStore = defineStore('artist', {
  state: () => ({
    artistId: null,
  }),
  actions: {
    setArtistData(artistId) {
      this.artistId = artistId
    },
    clearArtistData() {
      this.artistId = null;
    },
  },
  persist: true,
});

export const useAlbumStore = defineStore('album', {
  state: () => ({
    albumId: null,
  }),
  actions: {
    setAlbumData(albumId) {
      this.albumId = albumId
    },
    clearAlbumData() {
      this.albumId = null;
    },
  },
  persist: true,
});

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistId: null,
  }),
  actions: {
    setPlaylistData(playlistId) {
      this.playlistId = playlistId
    },
    clearPlaylistData() {
      this.playlistId = null;
    },
  },
  persist: true,
});

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: null,
  }),
  actions: {
    setSearchtData(searchQuery) {
      this.searchQuery = searchQuery
    },
    clearSearchtData() {
      this.searchQuery = null;
    },
  },
  persist: true,
});