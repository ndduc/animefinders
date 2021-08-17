using Amazon.Lambda.APIGatewayEvents;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NyaaApi_DotNet.Controller.Interface
{
    public interface IJikanAnime
    {

        /**
         Get single anime detail by id
           /anime id/{path}
            
         */
        Task<APIGatewayProxyResponse> GetAnime(int animeId, string path, int episode);

        Task<APIGatewayProxyResponse> SearchAnime(List<dynamic> enumPath, string path, string title);

        Task<APIGatewayProxyResponse> SearchAnimeSeasonal(string season, int year);

        Task<APIGatewayProxyResponse> SearchAnimeTmp(string anime);

        Task<APIGatewayProxyResponse> GetAnimeEpisode(int animeId);

        Task<APIGatewayProxyResponse> GetAnimeDetail(int animeId);
    }
}
