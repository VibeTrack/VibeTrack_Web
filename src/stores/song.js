import { defineStore } from 'pinia'
import artist from '../playlist.json'

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null,
    trackTime: null,
    currentVolume: 80,
    isLyrics: false,
    lyricsPosition: '0:00'
  }),
  actions: {
    loadSong(artist, track) {
      this.currentArtist = artist
      this.currentTrack = track

      if (this.audio && this.audio.src) {
        this.audio.pause()
        this.isPlaying = false
        this.audio.src = ''
      }

      this.audio = new Audio()
      this.audio.src = track.url

      setTimeout(() => {
        this.isPlaying = true
        this.audio.play()
      }, 200)
    },

    playOrPauseSong() {
      if (this.audio.paused) {
        this.isPlaying = true
        this.audio.play()
      } else {
        this.isPlaying = false
        this.audio.pause()
      }
    },

    playOrPauseThisSong(artist, track) {
      if (!this.audio || !this.audio.src || (this.currentTrack.songId !== track.songId)) {
        this.loadSong(artist, track)
        return
      }

      this.playOrPauseSong()
    },

    prevSong(currentTrack) {
      let track = artist.songs[currentTrack.songId - 2]
      this.loadSong(artist, track)
    },

    nextSong(currentTrack) {
      if (currentTrack.songId === artist.songs.length) {
        let track = artist.songs[0]
        this.loadSong(artist, track)
      } else {
        let track = artist.songs[currentTrack.songId]
        this.loadSong(artist, track)
      }
    },

    playFromFirst() {
      this.resetState()
      let track = artist.songs[0]
      this.loadSong(artist, track)
    },

    resetState() {
      this.isPlaying = false
      this.audio = null
      this.currentArtist = null
      this.currentTrack = null
    }
  },
  persist: true
})