using System;
using System.Collections.Generic;
using System.Text;

namespace NyaaApi_DotNet.Model
{
    public class JikanModel
    {
        public int year { get; set; }
        public int season { get; set; }

        public string animeName { get; set; }

        public int page { get; set; }

        public string type { get; set; }
    }
}
