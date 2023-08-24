import {z} from 'zod'

const ConfigValidator = z.object({
    HUBSPOT_TOKEN: z.string()
})

export const getConfig = () => ConfigValidator.parse(process.env)
