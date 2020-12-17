import { ResponseModel } from "Model/Response/ResponseModel";
import {SuccessResponse} from "../Model/Response/SuccessResponse";
import {ErrorResponse} from "../Model/Response/ErrorResponse";
import {PartyDBService} from "./PartyDBService";
import { Party } from "../Model/Party/Party";
import { User } from "../Model/User/User";
import { Genre } from "../Model/Genre/Genre";
import { Channel } from "../Model/Channel/Channel";

export class PartyBusiness {

    private partyDBService: PartyDBService;

    constructor(){
        this.partyDBService = new PartyDBService();
    }

    public async addParty(party: Party): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.addParty(party);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async removeParty(party: Party): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.removeParty(party);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getParties(user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.getParties(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async inviteParticipant(party: Party, user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.inviteParticipant(party, user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async acceptPartyInvite(party: Party, user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.acceptPartyInvite(party, user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async declinePartyInvite(party: Party, user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.declinePartyInvite(party, user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getPartyInvitations(user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.getPartyInvitations(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getParticipants(party: Party): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.getParticipants(party);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async removeParticipant(party: Party, user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.partyDBService.removeParticipant(party, user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }
}