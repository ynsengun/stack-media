import {Genre} from "../Model/Genre/Genre";

class GenreMapping{
    public map(genreModel): Genre {
        if(!genreModel) return null;
        return {
            genreId: genreModel.genreId || null,
            title: genreModel.title || null
        };
    }
}

export default new GenreMapping();