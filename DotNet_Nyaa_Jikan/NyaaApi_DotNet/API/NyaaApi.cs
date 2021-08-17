using System;
using System.Collections.Generic;
using System.Text;

namespace NyaaApi_DotNet.Common
{
    public class NyaaApi
    {

        //my heroku -- https://nyaapyapi.herokuapp.com/?q=minami

        //https://nyaasi-api.herokuapp.com/?q=minami&f=1&p=2
        //https://github.com/samedamci/nyaasi-api

        //https://nyaa.net/api/search?n=Maiko
        //https://nyaa.si/?q=dorohedoro+-+01&page=rss


        //public static string NYAA = "https://nyaa.si/?page=rss&";
        public static string HERONYAA = "https://nyaapyapi.herokuapp.com/?";


        //Heroku section
        public static string NAME = "q=";
        public static string CATEGORY = "category=";
        public static string SUBCATEGORY = "subcategory=";
        public static string PAGE = "page=";


        
    }


    enum HerokuEnum_Category
    {
        CATE_ALL = 0,
        CATE_ANIME = 1,
        CATE_AUDIO = 2,
        CATE_LITERATURE = 3,
        CATE_LIVEACTION = 4,
        CATE_PICTURE = 5,
        CATE_SOFTWARE = 6
    }

    enum HerokuEnum_SubCate
    {
        SUB_ANIME_MUSIC = 1,
        SUB_ANIME_ENG = 2,
        SUB_ANIME_NONENG = 3,
        SUB_ANIME_RAW = 4,
    }
}
