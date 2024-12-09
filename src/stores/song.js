import { defineStore } from 'pinia'

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null,
    trackTime: null,
    currentVolume: 80,
    queue: [], // Danh sách phát (queue)
    currentQueueIndex: 0, // Chỉ mục bài hát hiện tại trong queue
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

    prevSong() {
      if (this.currentQueueIndex > 0) {
        this.currentQueueIndex--
        this.loadSong(this.currentArtist, this.queue[this.currentQueueIndex])
      }
    },

    nextSong() {
      if (this.currentQueueIndex < this.queue.length - 1) {
        this.currentQueueIndex++
        this.loadSong(this.currentArtist, this.queue[this.currentQueueIndex])
      } else {
        this.currentQueueIndex = 0
        this.loadSong(this.currentArtist, this.queue[0])
      }
    },

    addToQueue(track) {
      if (!this.queue.some(existingTrack => existingTrack.songId === track.songId)) {
        this.queue.push(track)
      }
    },

    playFromFirst() {
      this.resetState()
      this.currentQueueIndex = 0
      this.loadSong(this.currentArtist, this.queue[0])
    },

    resetState() {
      this.isPlaying = false
      this.audio = null
      this.currentArtist = null
      this.currentTrack = null
      this.queue = [] // Reset queue
      this.currentQueueIndex = 0
    }
  },
  persist: true
})
