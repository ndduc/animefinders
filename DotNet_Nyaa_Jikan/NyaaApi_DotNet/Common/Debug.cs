using System;
using System.Collections.Generic;
using System.Text;

namespace NyaaApi_DotNet.Common
{
    public class Debug
    {
        public static void debug(dynamic x, dynamic y)
        {
            Console.WriteLine("DEBUG\t\t" + x + "\t\t" + y);
        }
    }
}
