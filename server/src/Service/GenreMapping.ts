import {Genre} from "../Model/Genre/Genre";

class GenreMapping{
    public map(genreModel): Genre {
        if(!genreModel) return null;
        return {
            genreId: genreModel.genreId || null,
            title: genreModel.title || null,
            description: genreModel.description || null
        };
    }
}

export default new GenreMapping();