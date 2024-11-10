import {mailtrapClient, sender} from './mailtrap-config.js'
import {VERIFICATION_EMAIL_TEMPLATE} from './emailTemplates.js'

export const sendVerificationEmail = async (email, verificationToken)=>{
    const recipient = [{email}];

    try {

        const response  = await mailtrapClient.send({

            from : sender,
            to: recipient,
            subject : 'Verify your email',
            html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category:" Email Verification"

        })

        console.log('Email sent successfully', response)

    } catch (error){

        console.error('Error sending verification email :', error)
        throw new Error (`Error sending verification email: ${error}`)

    }
}


export const sendWelcomeEmail = async (email, name)=>{
    const recipient = [{email}];

    try {

        const response  = await mailtrapClient.send({

            from : sender,
            to: recipient,
            template_uuid: "83f7da02-5c7f-448c-9008-6d4cc5c15c38" ,
            template_variables: {
                name : name
              }

        })

        console.log('Welcome Email sent successfully', response)

    } catch (error){

        console.error('Error sending welcome email :', error)
        throw new Error (`Error sending welcome email: ${error}`)

    }
}