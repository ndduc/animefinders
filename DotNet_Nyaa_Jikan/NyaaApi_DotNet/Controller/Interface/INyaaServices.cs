using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.DynamoDBv2.DataModel;


namespace NyaaApi_DotNet.Controller.Interface
{
    public interface INyaaServices
    {
      Task<APIGatewayProxyResponse> GetNyaaSearchEngAnime(APIGatewayProxyRequest request);

    }
}
