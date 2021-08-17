using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;

using Amazon.DynamoDBv2.DocumentModel;
using System.Net.Http;
using NyaaApi_DotNet.Controller.Interface;
using NyaaApi_DotNet.Controller.Implementation;
using NyaaApi_DotNet.Common;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]


namespace NyaaApi_DotNet.View
{
    class NyaaFunctions
    {
        private INyaaServices nyaa;
        private IJikanAnime jikanAnime;
        private string strResult;
        IDynamoDBContext DDBContext { get; set; }

        public NyaaFunctions()
        {
            this.nyaa = new NyaaServices();
            this.jikanAnime = new JikanAnime();
        }
        public async Task<APIGatewayProxyResponse> GetNyaaSearch(APIGatewayProxyRequest request)
        {
            return await nyaa.GetNyaaSearchEngAnime(request);
        }

        public async Task<APIGatewayProxyResponse> GetNyaaSearchByEp(APIGatewayProxyRequest request)
        {
            return await nyaa.GetNyaaSearchEngAnime(request);
        }

        public async Task<APIGatewayProxyResponse> SearchAnimeSeasonal(APIGatewayProxyRequest request)
        {
            Console.WriteLine("VIEW SEASONAL");
            string season = null;
            int year = -1;
            if (request.QueryStringParameters.Keys.Count < 1)
            {
                strResult = "Error: {Keys.count < 1} Please Provide Correct Parameter Value";
                return Https.apiResponse(HttpStatusCode.OK, strResult);
            }
            else
            {
                try
                {
                    foreach (KeyValuePair<string, string> v in request.QueryStringParameters)
                    {
                        string key = v.Key;
                        switch (key)
                        {
                            case JikanAwsParameter.SEASON:
                                season = v.Value;
                                break;
                            case JikanAwsParameter.YEAR:
                                year = int.Parse(v.Value);
                                break;
                            default:
                                break;
                        }
                    }
                    return await jikanAnime.SearchAnimeSeasonal(season, year);
                } catch (Exception e)
                {
                    strResult = "Error Exception Found: " + e.ToString();
                    return Https.apiResponse(HttpStatusCode.OK, strResult);
                }
            }
                
        }

        public async Task<APIGatewayProxyResponse> SearchAnimeTmp(APIGatewayProxyRequest request)
        {
            string title = null;
            if (request.QueryStringParameters.Keys.Count < 1)
            {
                strResult = "Error: {Keys.count < 1} Please Provide Correct Parameter Value";
                return Https.apiResponse(HttpStatusCode.OK, strResult);
            }
            else
            {
                try
                {
                    foreach (KeyValuePair<string, string> v in request.QueryStringParameters)
                    {
                        string key = v.Key;
                        switch (key)
                        {
                            case JikanAwsParameter.TITLE:
                                title = v.Value;
                                break;
                            default:
                                break;
                        }
                    }
                    return await jikanAnime.SearchAnimeTmp(title);
                }
                catch (Exception e)
                {
                    strResult = "Error Exception Found: " + e.ToString();
                    return Https.apiResponse(HttpStatusCode.OK, strResult);
                }
            }
        }

        public async Task<APIGatewayProxyResponse> GetAnimeEpisode(APIGatewayProxyRequest request)
        {
            int id = -1;
            if (request.QueryStringParameters.Keys.Count < 1)
            {
                strResult = "Error: {Keys.count < 1} Please Provide Correct Parameter Value";
                return Https.apiResponse(HttpStatusCode.OK, strResult);
            }
            else
            {
                try
                {
                    foreach (KeyValuePair<string, string> v in request.QueryStringParameters)
                    {
                        string key = v.Key;
                        switch (key)
                        {
                            case JikanAwsParameter.ANIMEID:
                                id = int.Parse(v.Value);
                                break;
                            default:
                                break;
                        }
                    }
                    return await jikanAnime.GetAnimeEpisode(id);
                }
                catch (Exception e)
                {
                    strResult = "Error Exception Found: " + e.ToString();
                    return Https.apiResponse(HttpStatusCode.OK, strResult);
                }
            }
        }

        public async Task<APIGatewayProxyResponse> GetAnimeDetail(APIGatewayProxyRequest request)
        {
            int id = -1;
            if (request.QueryStringParameters.Keys.Count < 1)
            {
                strResult = "Error: {Keys.count < 1} Please Provide Correct Parameter Value";
                return Https.apiResponse(HttpStatusCode.OK, strResult);
            }
            else
            {
                try
                {
                    foreach (KeyValuePair<string, string> v in request.QueryStringParameters)
                    {
                        string key = v.Key;
                        switch (key)
                        {
                            case JikanAwsParameter.ANIMEID:
                                id = int.Parse(v.Value);
                                break;
                            default:
                                break;
                        }
                    }
                    return await jikanAnime.GetAnimeDetail(id);
                }
                catch (Exception e)
                {
                    strResult = "Error Exception Found: " + e.ToString();
                    return Https.apiResponse(HttpStatusCode.OK, strResult);
                }
            }
        }


    }
}
