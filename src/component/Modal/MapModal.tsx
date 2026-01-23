import React from 'react'
import BaseModal from './BaseModal'
import MapScreen from '../map'

export default function MapModal({ isVisible, onClose, onSubmit }: { isVisible: boolean, onClose: () => void, onSubmit: (latitude: number, longitude: number) => void }) {
    return (
        <BaseModal isVisible={isVisible}>
            <MapScreen onSubmit={onSubmit} onCancel={onClose} />
        </BaseModal>
    )
}