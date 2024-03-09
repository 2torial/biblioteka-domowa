﻿using System.ComponentModel.DataAnnotations;

namespace ASP.NET_store_project.Server.Data
{
    public class User(string userName, string passWord, bool isAdmin = false)
    {
        [Key]
        public string UserName { get; set; } = userName;

        public string PassWord { get; set; } = passWord;

        public bool IsAdmin { get; set; } = isAdmin;

        // public List<Order> Orders { get; } = [];

    }
}