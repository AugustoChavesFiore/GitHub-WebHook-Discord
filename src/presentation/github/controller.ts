import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordServices } from "../services/discord.service";


export class GithubController{
    constructor(
        private readonly githubServices= new GitHubService(),
        private readonly discorServices= new DiscordServices(),

    ){};

    webhookHandler = (req:Request, res:Response)=>{
        const githubEvent = req.header('x-github-event')?? 'unknow';
        const signature = req.header('x-hub-signature-256')?? 'unknow';
        
        const payload = req.body;
        let message:string=''

        switch(githubEvent){
            case 'star':
                message=this.githubServices.OnStart(payload);
            break;
            case 'issues':
                message= this.githubServices.onIssue(payload);
            break;
            default:
                message=`Unknown event ${githubEvent}`;
        }
        this.discorServices.notify(message)
        .then(()=> res.status(202).send('Accepted'))
        .catch(()=> res.status(500).json({errror:'Internal server error'}));
    }
}