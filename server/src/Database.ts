import * as mysql from "mysql";
import * as util from "util";

export class Database{
    private con = null;

    private openConnection(){
        this.con = mysql.createConnection({
            host: "dijkstra.ug.bcc.bilkent.edu.tr",
            database: "hakan_sivuk",
            user: "hakan.sivuk",
            password: "k3iLQqwg",
            port: 3306
        });
    }

    private closeConnection(){
        this.con.end();
    }

    public async sendQuery(sqlQuery){
        this.openConnection();
        const query = util.promisify(this.con.query).bind(this.con);
        try {
            const rows = await query(sqlQuery);
            return rows;
        } 
        catch(err){
            throw err;
        }finally {
            this.closeConnection();
        }
    }

}