import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.*;

public class TableCreation {
    public static Connection conn = null;
    public static Statement statement = null;
    public static int stage = 0;

    private static void connect() throws SQLException{
        conn = DriverManager.getConnection("jdbc:mysql://dijkstra.ug.bcc.bilkent.edu.tr:3306/hakan_sivuk",
                "hakan.sivuk", "k3iLQqwg");
        statement = conn.createStatement();
        System.out.println("Connected successfully!");
    }

    private static void dropAll() throws SQLException{
        statement.executeUpdate("DROP TABLE IF EXISTS FriendshipInvitation");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS Friendship");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS PartyInvitation");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS PartyParticipation");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS MediaRating");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS Watch");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS ChannelMedia");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS ChannelHasGenre");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS MediaHasGenre");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS GenrePreference");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS SubComment");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS CommentLike");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS Channel");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS Movie");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS TVSeriesEpisode");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS Comment");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS Media");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS Genre");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS Party");
        done();
        statement.executeUpdate("DROP TABLE IF EXISTS User");
    }

    private static void done(){
        stage += 1;
        System.out.println(stage +". stage is successful!\n");
    }

    private static void createTable() throws SQLException{
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS User (" +
                "username VARCHAR(50) UNIQUE NOT NULL," +
                "email VARCHAR(128) NOT NULL," +
                "userType VARCHAR(20) NOT NULL," +
                "password VARCHAR(64) NOT NULL," +
                "PRIMARY KEY(username) )" +
                "ENGINE=INNODB;");
        done();
        statement.executeUpdate("INSERT INTO User VALUES(" +
                "'hakansivuk', 'hakansivuk@gmail.com', 'premium', 'hello')");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Party (" +
                "partyId VARCHAR(12) NOT NULL," +
                "creatorUsername VARCHAR(32) NOT NULL," +
                "name VARCHAR(64) NOT NULL," +
                "description VARCHAR(256)," +
                "numberOfMembers INT(10)," +
                "PRIMARY KEY (partyId)," +
                "FOREIGN KEY(creatorUsername) REFERENCES User(username) on delete cascade )" +
                "ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Party (" +
                "partyId VARCHAR(12) NOT NULL," +
                "creatorUsername VARCHAR(32) NOT NULL," +
                "name VARCHAR(64) NOT NULL," +
                "description VARCHAR(256)," +
                "numberOfMembers INT(10)," +
                "PRIMARY KEY (partyId)," +
                "FOREIGN KEY(creatorUsername) REFERENCES User(username) on delete cascade )" +
                "ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Genre (" +
                "genreId VARCHAR(32) NOT NULL," +
                "title VARCHAR(64) NOT NULL," +
                "description VARCHAR(128)," +
                "PRIMARY KEY(genreId) )" +
                "ENGINE=INNODB;");
        done();
        statement.executeUpdate("INSERT INTO Genre VALUES(" +
                "'0', 'Action', 'Action description');");
        done();
        statement.executeUpdate("INSERT INTO Genre VALUES(" +
                "'1', 'Adventure', 'Adventure description');");
        done();
        statement.executeUpdate("INSERT INTO Genre VALUES(" +
                "'2', 'Comedy', 'Comedy description');");
        done();
        statement.executeUpdate("INSERT INTO Genre VALUES(" +
                "'3', 'Drama', 'Drama description');");
        done();
        statement.executeUpdate("INSERT INTO Genre VALUES(" +
                "'4', 'Horror', 'Horror description');");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Media (" +
                "mediaId VARCHAR(32) NOT NULL," +
                "publishUsername VARCHAR(32)," +
                "name VARCHAR(64) NOT NULL," +
                "description VARCHAR(256)," +
                "path VARCHAR(256) NOT NULL," +
                "duration INT(10) NOT NULL," +
                "uploadDate DATE NOT NULL," +
                "PRIMARY KEY(mediaId)," +
                "FOREIGN KEY(publishUsername) REFERENCES User(username) on delete set null )" +
                "ENGINE=INNODB;");
        done();
        statement.executeUpdate("INSERT INTO Media VALUES(" +
                "'0', 'hakansivuk', 'Batman', 'Everybody like Joker', 'https://www.youtube.com/watch?v=g8evyE9TuYk', '138', '2020-07-09');");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Comment (" +
                "commentId VARCHAR(32) NOT NULL," +
                "username VARCHAR(32) NOT NULL," +
                "mediaId VARCHAR(32) NOT NULL," +
                "text VARCHAR(256) NOT NULL," +
                "timeStamp TIMESTAMP," +
                "PRIMARY KEY(commentId)," +
                "FOREIGN KEY(username) REFERENCES User(username) on delete cascade," +
                "FOREIGN KEY(mediaId) REFERENCES Media(mediaId) on delete cascade)" +
                "ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS TVSeriesEpisode (" +
                "mediaId VARCHAR(32) NOT NULL," +
                "episodeNumber INT NOT NULL," +
                "seasonNumber INT NOT NULL," +
                "emmyAward DATE," +
                "PRIMARY KEY(mediaId)," +
                "FOREIGN KEY(mediaId) REFERENCES Media(mediaId) on delete cascade ) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Movie (" +
                "mediaId VARCHAR(32) NOT NULL," +
                "oscarAward DATE," +
                "PRIMARY KEY(mediaId)," +
                "FOREIGN KEY(mediaId) REFERENCES Media(mediaId) on delete cascade )" +
                "ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Channel(" +
                "channelId VARCHAR(32) NOT NULL," +
                "username VARCHAR(32) NOT NULL," +
                "title VARCHAR(64)," +
                "PRIMARY KEY(channelId)," +
                "FOREIGN KEY(username) REFERENCES User(username) on delete cascade)" +
                "ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS CommentLike (" +
                "username VARCHAR(32) NOT NULL," +
                "commentId VARCHAR (32) NOT NULL," +
                "PRIMARY KEY( username, commentId)," +
                "FOREIGN KEY(username) REFERENCES User(username) on delete cascade," +
                "FOREIGN KEY(commentId) REFERENCES Comment(commentId) on delete cascade" +
                ") ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS SubComment(" +
                "parentId VARCHAR(32) NOT NULL," +
                "childId VARCHAR(32) NOT NULL," +
                "PRIMARY KEY(parentId, childId)," +
                "FOREIGN KEY(parentId) REFERENCES Comment(commentId) on delete cascade," +
                "FOREIGN KEY(childId) REFERENCES Comment(commentId) on delete cascade" +
                ") ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS GenrePreference(" +
                "username VARCHAR(32) NOT NULL," +
                "genreId VARCHAR(32) NOT NULL," +
                "PRIMARY KEY(username, genreId)," +
                "FOREIGN KEY(username) REFERENCES User(username) on delete cascade," +
                "FOREIGN KEY(genreId) REFERENCES Genre(genreId) on delete cascade" +
                ") ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS MediaHasGenre(" +
                "mediaId VARCHAR(32) NOT NULL," +
                "genreId VARCHAR(32) NOT NULL," +
                "PRIMARY KEY(mediaId, genreId)," +
                "FOREIGN KEY(mediaId) REFERENCES Media(mediaId) on delete cascade," +
                "FOREIGN KEY(genreId) REFERENCES Genre(genreId) on delete cascade) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS ChannelHasGenre(" +
                "channelId VARCHAR(32) NOT NULL," +
                "genreId VARCHAR(32) NOT NULL," +
                "PRIMARY KEY(channelId, genreId)," +
                "FOREIGN KEY(channelId) REFERENCES Channel(channelId) on delete cascade," +
                "FOREIGN KEY(genreId) REFERENCES Genre(genreId) on delete cascade) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS ChannelMedia(" +
                "mediaId VARCHAR(32) NOT NULL," +
                "channelId VARCHAR(32) NOT NULL," +
                "PRIMARY KEY(mediaId, channelId)," +
                "FOREIGN KEY(mediaId) REFERENCES Media(mediaId) on delete cascade," +
                "FOREIGN KEY(channelId) REFERENCES Channel(channelId) on delete cascade) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Watch(" +
                "username VARCHAR(32) NOT NULL," +
                "mediaId VARCHAR(32) NOT NULL," +
                "Progress INT NOT NULL," +
                "timeStamp TIMESTAMP NOT NULL," +
                "PRIMARY KEY(username , mediaId)," +
                "FOREIGN KEY(username) REFERENCES User(username) on delete cascade," +
                "FOREIGN KEY(mediaId) REFERENCES Media(mediaId) on delete cascade) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS MediaRating(" +
                "username VARCHAR(32) NOT NULL," +
                "mediaId VARCHAR(32) NOT NULL," +
                "rate INT NOT NULL," +
                "PRIMARY KEY(username , mediaId)," +
                "FOREIGN KEY(username) REFERENCES User(username) on delete cascade," +
                "FOREIGN KEY(mediaId) REFERENCES Media(mediaId) on delete cascade) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS PartyParticipation(" +
                "partyId VARCHAR(32) NOT NULL," +
                "username VARCHAR(32) NOT NULL," +
                "PRIMARY KEY(partyId, username)," +
                "FOREIGN KEY(partyId) REFERENCES Party(partyId) on delete cascade," +
                "FOREIGN KEY(username) REFERENCES User(username) on delete cascade) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS PartyInvitation(" +
                "partyId VARCHAR(32) NOT NULL," +
                "username VARCHAR(32) NOT NULL," +
                "timeStamp TIMESTAMP NOT NULL," +
                "PRIMARY KEY(partyId, username)," +
                "FOREIGN KEY(partyId) REFERENCES Party(partyId) on delete cascade," +
                "FOREIGN KEY(username) REFERENCES User(username) on delete cascade) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS Friendship(" +
                "friend1Username VARCHAR(32) NOT NULL," +
                "friend2Username VARCHAR(32) NOT NULL," +
                "PRIMARY KEY(friend1Username, friend2Username)," +
                "FOREIGN KEY(friend1Username) REFERENCES User( username) on delete cascade," +
                "FOREIGN KEY(friend2Username) REFERENCES User( username) on delete cascade) ENGINE=INNODB;");
        done();
        statement.executeUpdate("CREATE TABLE IF NOT EXISTS FriendshipInvitation(" +
                "inviterUsername VARCHAR(32) NOT NULL," +
                "invitedUsername VARCHAR(32) NOT NULL," +
                "PRIMARY KEY(inviterUsername, invitedUsername )," +
                "FOREIGN KEY(inviterUsername) REFERENCES User( username) on delete cascade," +
                "FOREIGN KEY(invitedUsername) REFERENCES User( username) on delete cascade) ENGINE=INNODB;");

        System.out.println("Tables are created!");
    }

    private static void dropAllAndCreate() throws SQLException{
        dropAll();
        createTable();
    }

    public static void main(String args []){
        try{
            connect();
            //dropAll();
            //createTable();
            dropAllAndCreate();

        } catch(Exception ex){
            System.out.println(ex.getMessage());
        }

    }
}
