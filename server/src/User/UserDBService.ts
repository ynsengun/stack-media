import { User } from "Model/User/User";
import mysql from "mysql";
import { connected } from "process";

export class UserDBService {

    public async login(userId: string, password: string): Promise<any> {
        let result = null;

        var con = mysql.createConnection({
            host: "dijkstra.ug.bcc.bilkent.edu.tr",
            database: "hakan_sivuk",
            user: "hakan.sivuk",
            password: "k3iLQqwg",
            port: 3306
        });

        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM User WHERE username = " + userId + " and password = " + password + ";", function (err, result, fields) {
              if (err) throw err;
              if (result != null)
              {
                  console.log(result);
              }
              else
              {
                  console.log("wrong");
              }
            });
        });
        con.end();
        return result;
    }

    public async register(user: User): Promise<any> {
        let result = null;

        var con = mysql.createConnection({
            host: "dijkstra.ug.bcc.bilkent.edu.tr",
            database: "hakan_sivuk",
            user: "hakan.sivuk",
            password: "k3iLQqwg",
            port: 3306
        });

        con.connect(function(err) {
            if (err) throw err;
            con.query("INSERT INTO User VALUES(" + user.userId + "," + user.username + "," + user.email + "," + user.userType + "," + user.password + ");", function (err, result, fields) {
              if (err) throw err;
              if (result != null)
              {
                  console.log(result);
              }
              else
              {
                  console.log("wrong");
              }
            });
        });
        con.end();
        return result;
    }
}