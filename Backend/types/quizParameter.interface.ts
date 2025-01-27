export interface QuizParams {
    limit: number;
    category: Categories;
    difficulty: Difficulties;
    gamemode: Gamemode;
  }

export type Gamemode = 'mort_subite' | 'normal'

export type Difficulties = 'facile' | 'normal' | 'difficile'

export type Categories = 'tv_cinema' | 'art_litterature' | 'musique' |'actu_politique' | 'culture_generale' | 'sport' | 'jeux_videos'