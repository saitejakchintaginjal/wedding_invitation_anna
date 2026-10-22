Music for the invitation (both files are loaded by components/MusicPlayer.tsx):

  Soulful_Contemporary_Intro.mp3   plays once, right after the entrance is tapped
  Under_the_Marigold_Canopy.mp3    the regular wedding music; the intro blends into it and it then loops

To swap a track, replace the file (or change INTRO_SRC / MAIN_SRC at the top of MusicPlayer.tsx).
Tips: use music you have the right to use; keep each file small (about 96-128 kbps) so it loads fast on phones.
The blend length and loudness can be changed with CROSSFADE and VOLUME in MusicPlayer.tsx.
