using Amazon.Lambda.APIGatewayEvents;
using NyaaApi_DotNet.API;
using NyaaApi_DotNet.Common;
using NyaaApi_DotNet.Controller.Interface;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace NyaaApi_DotNet.Controller.Implementation
{
    class JikanManga : IJikanManga
    {
        readonly string url = JikanApi.JIKAN + JikanApi.ANIME;
        private string strResult;
        private StringBuilder endpoint;

        private async Task<APIGatewayProxyResponse> responseHelperAsync(HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
            {
                strResult = await response.Content.ReadAsStringAsync();
                return Https.apiResponse(HttpStatusCode.OK, strResult);
            }
            else
            {
                strResult = "No Search Result Found";
                return Https.apiResponse(HttpStatusCode.OK, strResult);
            }
        }
        public async Task<APIGatewayProxyResponse> GetManga(int mangaId, string path)
        {
            endpoint = new StringBuilder();
            if (mangaId == -1)
            {
                strResult = "Missing Parameters";
                return Https.apiResponse(HttpStatusCode.OK, strResult);
            }
            else
            {
                if (path == null)
                {
                    endpoint.Append(url).Append(JikanApi.SLASH).Append(mangaId);
                }
                else
                {
                    endpoint.Append(url).Append(JikanApi.SLASH).Append(mangaId).Append(JikanApi.SLASH).Append(path);
                }
                using var client = new HttpClient();
                client.BaseAddress = new Uri(endpoint.ToString());
                HttpResponseMessage response = await client.GetAsync(client.BaseAddress);
                return await responseHelperAsync(response);
            }
        }


    }
}