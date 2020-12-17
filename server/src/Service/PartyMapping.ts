import {Party} from "../Model/Party/Party";

class PartyMapping{
    public map(partyModel): Party {
        if(!partyModel) return null;
        return {
            partyId: partyModel.partyId || null,
            creatorUsername: partyModel.creatorUsername || null,
            name: partyModel.name || null,
            description: partyModel.description,
            numberOfMembers: partyModel.numberOfMembers
        };
    }
}

export default new PartyMapping();