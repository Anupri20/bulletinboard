using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class Comment: MComment
    {
       
        public string cdetails { get; set; }
        public string timestamp { get; set; }
      


    }
    public class MComment
    {
        public int Cid { get; set; }
        public int Uid { get; set; }
        public int Pid { get; set; }

    }
}
