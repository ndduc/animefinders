using NyaaApi_DotNet.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace NyaaApi_DotNet.Model
{
    public class NyaaModel
    {
        public string name { get; set; }
        private string episode;
        
        public string getEpisode()
        {
            return this.episode;
        }

        public void setEpisode(string episode)
        {
            if(episode.Length == 1)
            {
                this.episode = "0" + episode;
            } else
            {
                this.episode = episode;
            }
        }
        public string page { get; set; }

        public void debugPrint()
        {
            Debug.debug("NAME", this.name);
            Debug.debug("EPISODE", this.episode);
            Debug.debug("PAGE", this.page);
        }
    }
}
