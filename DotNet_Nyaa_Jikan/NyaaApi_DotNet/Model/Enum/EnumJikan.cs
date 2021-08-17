using System;
using System.Collections.Generic;
using System.Text;

namespace NyaaApi_DotNet.Model.Enum
{
    class EnumJikan
    {

        public enum SEASON
        {
            SPRING = 0,
            SUMMER = 1,
            FALL = 2,
            WINTER = 3
        }

        public enum TYPE
        {
            ANIME = 0,
            MANGA = 1,
            PERSON = 2,
            CHARACTER = 3
        }

        public enum ANIME_TYPE
        {
            TV = 0,
            OVA = 1,
            MOVIE = 2,
            SPECIAL = 3,
            ONA = 4,
            MUSIC = 5
        }

        public enum MANGA_TYPE
        {
            MANGA = 0,
            NOVEL = 1,
            ONESHOT = 2,
            DOUJIN = 3,
            MANHWA = 4,
            MANHUA = 5
        }

        public enum ANIME_STATUS
        {
            AIRING = 0,
            COMPLETED = 1,
            COMPLETE = 2,
            TO_BE_ARIED = 3,
            TBA = 4,
            UPCOMING = 5
        }

        public enum MANGA_STATUS
        {
            PUBLISHING = 0,
            COMPLETED = 1,
            COMPLETE = 2,
            TO_BE_PUBLISHED = 3,
            TBP = 4,
            UPCOMING = 5
        }

        public enum ANIME_RATED
        {
            G = 0, //ALL AGE
            PG = 1, //CHILDREN
            PG13 = 2, //TEEN
            R17 = 3, //17+
            R = 4, //MILD
            RX = 5 //HENTAI
        }

        public enum ORDERBY
        {
            TITLE = 0,
            START_DATE = 1,
            END_DATE = 2,
            SCORE = 3,
            TYPE = 4,
            MEMBER = 5,
            ID = 6,
            EPISODES = 7,
            RATING = 8
        }

        public enum SORT
        {
            ascending = 0,
            asc = 1,
            descending = 2,
            desc = 3
        }

        public enum ANIME_GENRE
        {
            ACTION = 1,
            ADVENTURE = 2,
            CARS = 3,
            COMEDY = 4,
            DEMENTIA = 5,
            DEMONS = 6,
            MYSTERY = 7,
            DRAMA = 8,
            ECCHI = 9,
            FANTASY = 10,
            GAME = 11,
            HENTAI = 12,
            HISTORIAL = 13,
            HORROR = 14,
            KIDS = 15,
            MAGIC = 16,
            MARTIAL_ART = 17,
            MECHA = 18,
            MUSIC = 19,
            PARODY = 20,
            SAMURAI = 21,
            ROMANCE = 22,
            SCHOOL = 23,
            SCI_FI = 24,
            SHOUJO = 25,
            SHOUJO_AI = 26,
            SHOUNEN = 27,
            SHOUNEN_AI = 28,
            SPACE = 29,
            SPORTS = 30,
            SUPER_POWER = 31,
            VAMPIRE = 32,
            YAOI = 33,
            YURI = 34,
            HAREM = 35,
            SLICE_OF_LIFE = 36,
            SUPERNATURAL= 37,
            MILITARY = 38,
            POLICE = 39,
            PSYCHOLOGICAL = 40,
            THRILLER = 41,
            SEINEN = 42,
            JOSEI = 43
        }

        public enum MANGA_GENRE
        {
            ACTION = 1,
            ADVENTURE = 2,
            CARS = 3,
            COMEDY = 4,
            DEMENTIA = 5,
            DEMONS = 6,
            MYSTERY = 7,
            DRAMA = 8,
            ECCHI = 9,
            FANTASY = 10,
            GAME = 11,
            HENTAI = 12,
            HISTORIAL = 13,
            HORROR = 14,
            KIDS = 15,
            MAGIC = 16,
            MARTIAL_ART = 17,
            MECHA = 18,
            MUSIC = 19,
            PARODY = 20,
            SAMURAI = 21,
            ROMANCE = 22,
            SCHOOL = 23,
            SCI_FI = 24,
            SHOUJO = 25,
            SHOUJO_AI = 26,
            SHOUNEN = 27,
            SHOUNEN_AI = 28,
            SPACE = 29,
            SPORTS = 30,
            SUPER_POWER = 31,
            VAMPIRE = 32,
            YAOI = 33,
            YURI = 34,
            HAREM = 35,
            SLICE_OF_LIFE = 36,
            SUPERNATURAL = 37,
            MILITARY = 38,
            POLICE = 39,
            PSYCHOLOGICAL = 40,
            SEINEN = 41,
            JOSEI = 42,
            DOUJINSHI = 43,
            GENDER_BENDER = 44,
            THRILLER  = 45
        }
    }
}
