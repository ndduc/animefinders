using Amazon.Lambda.APIGatewayEvents;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Xml;

namespace NyaaApi_DotNet.Common
{
    class Https
    {
        public static APIGatewayProxyResponse apiResponse(HttpStatusCode status, dynamic body)
        {
            return new APIGatewayProxyResponse
            {
                StatusCode = (int)status,
                Body = body == null ? "" : body,
                Headers = new Dictionary<string, string>
                {
                    {
                        "Content-Type", "application/json"
                    }
                    ,
                    {
                        "Access-Control-Allow-Origin", "https://d13lyeufjd1b7.cloudfront.net"
                    },
                    {
                        "Access-Control-Allow-Credentials", "true"
                    }
                }
            };
        }

        public static APIGatewayProxyResponse apiResponseXML(HttpStatusCode status, dynamic body)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(body);
            string jsonText = JsonConvert.SerializeXmlNode(doc);

            return new APIGatewayProxyResponse
            {
                StatusCode = (int)status,
                Body = body == null ? "" : jsonText,
                Headers = new Dictionary<string, string>
                {
                    {
                        "Content-Type", "application/json"
                    },
                    {
                        "Access-Control-Allow-Origin", "https://d13lyeufjd1b7.cloudfront.net"
                    },
                    {
                        "Access-Control-Allow-Credentials", "true"
                    }
                }
            };
        }
    }
}
