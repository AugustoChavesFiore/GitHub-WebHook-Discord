import { envs } from "../../config"


export class DiscordServices {

    private readonly discordWebhookURL= envs.DISCORD_WEBHOOK_URL;


    async notify(message:string){

        const body={
            content:message,
            embeds:[
                {
                    image:{url:"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTliZHB2aHBudzE2NjBxeGczYnlndTljN2c5dWhvaTYzY2F1MDYyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif"}
                }
            ]
        };
        const resp= await fetch(this.discordWebhookURL,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(body),
        });

        if (!resp){
            console.log('Error sending message to Discord');
            return false
        }
        return true;
    }

}