import {mailtrapClient, sender} from './mailtrap-config.js'
import {VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from './emailTemplates.js'

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


export const sendResetPasswordEmail = async (email, resetURL)=>{
    const recipient = [{email}];

    try {

        const response  = await mailtrapClient.send({

            from : sender,
            to: recipient,
            subject : 'Reset Your Password',
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category:" Password reset"

        })

        console.log('Email sent successfully', response)

    } catch (error){

        console.error('Error sending password reset mail :', error)
        throw new Error (`Error sending password reset mail: ${error}`)

    }
}


export const sendResetPasswordSuccessEmail = async (email)=>{
    const recipient = [{email}];

    try {

        const response  = await mailtrapClient.send({

            from : sender,
            to: recipient,
            subject : 'Reset Password Successful',
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:" Password reset success"

        })

        console.log('Email sent successfully', response)

    } catch (error){

        console.error('Error sending password reset success mail :', error)
        throw new Error (`Error sending password reset success mail: ${error}`)

    }
}

