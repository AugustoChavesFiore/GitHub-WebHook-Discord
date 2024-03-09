import { GitHubIssuePayload, GitHubStartPayload } from "../../interfaces";



export class GitHubService{
    constructor() {
        
    }

    OnStart(payload:GitHubStartPayload):string{

        let message:string='';
        const {starred_at, action, sender, repository}=payload;
        message= ` User ${sender.login} ${action} star on ${repository.full_name}`;
        return message;

    };

    onIssue(payload:GitHubIssuePayload):string{
        let message: string;
        const{action, issue }=payload;

        if(action === 'opened'){
            return `An issue was closes by ${issue.title}`;
            
        };
        
        if(action === 'closed'){
            return `An issue was closes by ${issue.user.login}`; 
            
        };
        
        if(action === 'reopened'){
            return `An issue was reopened by ${issue.user.login}`;
            
        };

        return `Unhandle action for the issue event ${action} `;
    }
}