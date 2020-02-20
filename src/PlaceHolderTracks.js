const placeHolderTracks = [
  {
    played_at: Date.now(), // just now
    track: {
      uri: 'spotify:track:3hLdU2myevq7BHHZB6z5Ff',
      name: 'Good Vibe',
      artists: [
        { name: 'BRKLYN' },
        { name: 'Zack Martino' },
      ],
      album: {
        images: [
          {}, {}, { url: 'https://i.scdn.co/image/ab67616d00004851004a3d56256cbc2b762f9a5e' },
        ],
      },
    },
  },
  {
    played_at: Date.now() - (5 * 60 * 1000), // 5 minutes ago
    track: {
      uri: 'spotify:track:0JQ5MbyriK6ruD3t6RZ7ix',
      name: 'Never Seen The Rain',
      artists: [
        { name: 'Tones and I' },
      ],
      album: {
        images: [
          {}, {}, { url: 'https://i.scdn.co/image/ab67616d00004851aa1beea495a0070294c30e31' },
        ],
      },
    },
  },
  {
    played_at: Date.now() - (12 * 60 * 1000), // 12 minutes ago
    track: {
      uri: 'spotify:track:2PVzxgWtMb5cP5mjMrXb9C',
      name: "Let's Go",
      artists: [
        { name: 'Tobu' },
      ],
      album: {
        images: [
          {}, {}, { url: 'https://i.scdn.co/image/ab67616d00004851c5004ef1d38acf1aa43204f9' },
        ],
      },
    },
  },
  {
    played_at: Date.now() - (60 * 60 * 1000), // 1 hour ago
    track: {
      uri: 'spotify:track:1nRewrnvNch6k5yEHcbO0h',
      name: 'Hold On',
      artists: [
        { name: 'Matt Nash' },
      ],
      album: {
        images: [
          {}, {}, { url: 'https://i.scdn.co/image/12779ab85417b00c10c318bb8c6e23b98a86f17f' },
        ],
      },
    },
  },
  {
    played_at: Date.now() - (63 * 60 * 1000), // ~1 hour ago
    track: {
      uri: 'spotify:track:4MdHqtTjEkjRJxtnQjkxok',
      name: 'Words Of Love (Numa Numa)',
      artists: [
        { name: 'Different Heaven' },
        { name: 'Lost Boy' },
      ],
      album: {
        images: [
          {}, {}, { url: 'https://i.scdn.co/image/ca6214920366c2ed8776b4b859925f49896dd5b7' },
        ],
      },
    },
  },
];

export default placeHolderTracks;
