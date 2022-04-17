import { Button, Form, Input, InputNumber, InputRef, Modal, Tag } from 'antd'
import React, { useContext, useRef, useState } from 'react'
import { Web3Context } from '../../context/web3'
import Address from '../Address'
import './index.scss'

export default () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [walletMember, setWalletMember] = useState<string[]>(['0x431B4CA18E269Fc7e1F5AF49B9F4E2AF683f6207'])
  const [showMemberInput, setShowMemberInput] = useState<boolean>(false)
  const memberRef = useRef<InputRef>()
  const [editMember, setEditMember] = useState<string>('')

  const { state: { account } } = useContext(Web3Context)

  return <>
    <Button onClick={() => setModalVisible(true)} >新建多签钱包</Button>
    <Modal
      title="新建多签钱包"
      visible={isModalVisible}
      onOk={() => { }}
      onCancel={() => setModalVisible(false)}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}>
        <Form.Item label="当前网络">测试网络</Form.Item>
        <Form.Item label="钱包创建者">
          <Address address={account} length={16}/>
        </Form.Item>
        <Form.Item label="钱包名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="钱包成员" rules={[{ required: true }]}>
          <>
            {
              walletMember.map(member => <Tag
                closable
                color="blue"
                onClose={(e) => {
                  e.preventDefault()
                  setWalletMember(walletMember.filter(item => item !== member))
                }}
              >
                {member}
              </Tag>)
            }
            {showMemberInput && <Input
              // @ts-ignore
              ref={memberRef}
              value={editMember}
              className="tagInput"
              onChange={(e) => {
                setEditMember(e.target.value)
                memberRef.current?.focus()
              }}
              onPressEnter={() => {
                if (editMember) {
                  setWalletMember([...walletMember, editMember])
                  setEditMember('')
                }
                setShowMemberInput(false)
              }}
              onBlur={() => {
                if (editMember) {
                  setWalletMember([...walletMember, editMember])
                  setEditMember('')
                }
                setShowMemberInput(false)
              }}
            />}
            <Tag className="site-tag-plus" onClick={() => {
              setShowMemberInput(true);
              // @ts-ignore
              process.nextTick(memberRef.current.input.focus)
            }}>添加成员</Tag>
          </>
        </Form.Item>
        <Form.Item label="最少同意人数" rules={[{ required: true }]}>
          <InputNumber min={2} />
        </Form.Item>
      </Form>
    </Modal>
  </>
}