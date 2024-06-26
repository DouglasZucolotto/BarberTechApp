import { Check, Close, Delete, Edit } from '@mui/icons-material'
import * as S from './style'
import { useState } from 'react'
import { ManageTypes } from '../../pages/profile/manage/Manage'
import {
  useBarbers,
  useEstablishments,
  useFeedbacks,
  useHaircuts,
  useSchedules,
  useUsers,
  useTryCatch
} from '../../hooks'
import {
  BarberModal,
  ConfirmationModal,
  EstablishmentModal,
  GetResponse,
  HaircutModal,
  LoginModal,
  Visible
} from '..'

interface ItemProps {
  type: ManageTypes
  data: GetResponse
  fetchDataInternal: (page: number, searchTerm?: string) => Promise<void>
}

type ContentType = {
  [K in ManageTypes]: {
    columns: any[]
    delete?: (id: string) => Promise<void>
    modal?: JSX.Element
    should: {
      edit?: boolean
      delete?: boolean
      cancel?: boolean
      complete?: boolean
    }
  }
}

type ConfirmationModal = 'delete' | 'complete' | 'cancel' | 'closed'

export const Item = ({ type, data, fetchDataInternal }: ItemProps) => {
  const [editModal, setEditModal] = useState<boolean>(false)
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModal>('closed')

  const { deleteUser } = useUsers()
  const { cancelSchedule, completeSchedule } = useSchedules()
  const { deleteHaircut } = useHaircuts()
  const { deleteFeedback } = useFeedbacks()
  const { deleteEstablishment } = useEstablishments()
  const { deleteBarber } = useBarbers()
  const { fetchData } = useTryCatch()

  const onCloseModals = () => {
    setConfirmationModal('closed')
    setEditModal(false)
  }

  const content: ContentType = {
    users: {
      modal: (
        <LoginModal
          open={editModal}
          onClose={onCloseModals}
          type="edit"
          userId={data.id}
        />
      ),
      columns: [data.name, data.email],
      delete: deleteUser,
      should: { edit: true, delete: true }
    },
    schedules: {
      columns: [data.name, data.barberName, data.haircutName],
      should: { cancel: true, complete: true }
    },
    haircuts: {
      modal: (
        <HaircutModal
          open={editModal}
          onClose={onCloseModals}
          haircutId={data.id}
        />
      ),
      columns: [data.name, data.about, data.price],
      delete: deleteHaircut,
      should: { edit: true, delete: true }
    },
    feedbacks: {
      columns: [
        data.comment,
        data.userName,
        data.establishmentAddress,
        data.haircutName,
        data.barberName
      ],
      delete: deleteFeedback,
      should: { delete: true }
    },
    establishments: {
      modal: (
        <EstablishmentModal
          open={editModal}
          onClose={onCloseModals}
          establishmentId={data.id}
        />
      ),
      columns: [data.address],
      delete: deleteEstablishment,
      should: { edit: true, delete: true }
    },
    barbers: {
      modal: (
        <BarberModal
          open={editModal}
          onClose={onCloseModals}
          barberId={data.id}
        />
      ),
      columns: [
        data.name,
        data.contact,
        data.social?.instagram,
        data.social?.facebook,
        data.social?.twitter
      ],
      delete: deleteBarber,
      should: { edit: true, delete: true }
    }
  }

  const actions = {
    delete: content[type].delete,
    complete: completeSchedule,
    cancel: cancelSchedule,
    closed: null
  }

  const handleConfirm = async () => {
    const action = actions[confirmationModal]

    if (!action) return

    const { success } = await fetchData(action(data.id ?? ''))

    if (success) {
      fetchDataInternal(1)
    }
  }

  return (
    <S.ItemBox>
      {content[type].columns.map((column) =>
        column ? (
          <span>{column}</span>
        ) : (
          <span className="null">[Não informado.]</span>
        )
      )}
      <div className="buttons-box">
        <Visible when={!!content[type].should.edit}>
          <button onClick={() => setEditModal(true)}>
            <Edit />
          </button>
        </Visible>
        <Visible when={!!content[type].should.delete}>
          <button onClick={() => setConfirmationModal('delete')}>
            <Delete />
          </button>
        </Visible>
        <Visible when={!!content[type].should.complete}>
          <button onClick={() => setConfirmationModal('complete')}>
            <Check />
          </button>
        </Visible>
        <Visible when={!!content[type].should.cancel}>
          <button onClick={() => setConfirmationModal('cancel')}>
            <Close />
          </button>
        </Visible>
      </div>
      {content[type].modal}
      <ConfirmationModal
        open={confirmationModal !== 'closed'}
        onClose={onCloseModals}
        handleConfirm={handleConfirm}
      />
    </S.ItemBox>
  )
}
