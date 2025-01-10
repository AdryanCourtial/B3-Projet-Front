export type ToasterType = "erreur" | "succes" | "warning"

export interface Toaster {
    type: ToasterType
    message: string
}
