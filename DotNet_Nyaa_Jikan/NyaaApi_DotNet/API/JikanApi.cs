using System;
using System.Collections.Generic;
using System.Text;

namespace NyaaApi_DotNet.API
{
    class JikanApi
    {
        public static readonly string JIKAN = "https://api.jikan.moe/v3/";
        public static readonly string SLASH = "/";
        public static readonly string AND = "&";
        public static readonly string QUEST = "?";
        public static readonly string ANIME = "anime/";
        public static readonly string STAFF = "characters_staff/";
        public static readonly string SEARCH = "search/";
        public static readonly string SEASON = "season/";
        public static readonly string EPISODE = "episodes/";
    }

    class JikanParameter
    {
        public static readonly string TITLE = "q=";
        public static readonly string TYPE = "type=";
        public static readonly string PAGE = "page=";
        public static readonly string STATUS = "status=";
        public static readonly string RATED = "rated=";
        public static readonly string GENRE = "genre=";
        public static readonly string SCORE = "score=";
        public static readonly string START = "start_date=";
        public static readonly string END = "end_date=";
        public static readonly string LIMIT = "limit=";
        public static readonly string ORDER = "order_by=";
        public static readonly string SORT = "sort=";
    }
}
