using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

using Amazon.DynamoDBv2.DataModel;
using System;
using Amazon.DynamoDBv2.DocumentModel;
using System.Net.Http;
using System.Net.Http.Headers;
using NyaaApi_DotNet.Common;
using NyaaApi_DotNet.Controller.Interface;
using NyaaApi_DotNet.Model;
using System.Text;
using Newtonsoft.Json;

namespace NyaaApi_DotNet.Controller.Implementation
{
    class NyaaServices : INyaaServices
    {
        readonly string url = NyaaApi.HERONYAA;
        private string strResult;
        private bool isNextExist = false;
        public  async Task<APIGatewayProxyResponse> GetNyaaSearchEngAnime(APIGatewayProxyRequest request)
        {
            NyaaModel nyaaModel = new NyaaModel();
            StringBuilder endpoint = new StringBuilder();
            if (request.QueryStringParameters.Keys.Count < 1)
            {
                strResult = "Error: {Keys.count < 1} Please Provide Correct Parameter Value";
                return Https.apiResponse(HttpStatusCode.OK, strResult);
            } else
            {
                try
                {
                    foreach (KeyValuePair<string, string> v in request.QueryStringParameters)
                    {
                        string key = v.Key;
                        switch(key)
                        {
                            case Parameters.NAME:
                                nyaaModel.name = v.Value;
                                if (request.QueryStringParameters.ContainsKey(Parameters.EPISODE))
                                {
                                    nyaaModel.setEpisode(request.QueryStringParameters[Parameters.EPISODE]);
                                    endpoint.Append(NyaaApi.NAME + nyaaModel.name + " - " + nyaaModel.getEpisode() + "&");
                                } else
                                {
                                    endpoint.Append(NyaaApi.NAME + nyaaModel.name + "&");
                                }
                                continue;
                            default:
                                break;
                        }

                        
                    }
                    endpoint.Append(NyaaApi.CATEGORY + (int)HerokuEnum_Category.CATE_ANIME + "&");
                    endpoint.Append(NyaaApi.SUBCATEGORY + (int)HerokuEnum_SubCate.SUB_ANIME_ENG + "&");
                    if(nyaaModel.name == null && nyaaModel.page == null)
                    {
                        strResult = "Missing Parameters";
                        return Https.apiResponse(HttpStatusCode.OK, strResult);
                    } else
                    {
                        using var client = new HttpClient();
                        client.BaseAddress = new Uri(url + endpoint.ToString());
                        Console.WriteLine("Check Client URL\t\t" + client.BaseAddress.ToString());
                        HttpResponseMessage response = await client.GetAsync(client.BaseAddress);

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
                }  catch (Exception e)
                {
                    strResult = "Error Exception Found: " + e.ToString();
                    return Https.apiResponse(HttpStatusCode.OK, strResult);
                }
            }



        }

    }
}
