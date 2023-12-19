import { ClientData } from 'pages/Client/client.interface'

export interface ClientModalProps {
    formData: ClientData | Record<string, never>
    onClose: () => void
    afterClose?: () => void
}

export interface PaymentCollector {
    id: string
    label: string
}
