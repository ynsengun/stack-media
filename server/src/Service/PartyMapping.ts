import {Party} from "../Model/Party/Party";

class PartyMapping{
    public map(partyModel): Party {
        if(!partyModel) return null;
        return {
            partyId: partyModel.partyId || null,
            username: partyModel.username || null,
            name: partyModel.name || null,
            description: partyModel.description,
            role: partyModel.role
        };
    }
}

export default new PartyMapping();