'use strict';
import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/storage/storage-service.js'

const { makeLorem, makeId } = utilService;
const STORAGE_MAIL = 'mailDB'

let gMail = _loaFromStorage()



export const mailService = {
  query,
  sortMail,
  getMailById,
  remove,
  toggleIsRead,
  sendMail,
  getByLabel,
  getLabels,
  removeLabel,
  getAvailableLabels,
  addNewMailLabel,
  addNewLabel,
  toggleMailStar
};

function _createDB() {
  return {
    mails: [
      {
        id: makeId(),
        from: 'eBay@ebay.com',
        subject: '3 tips for shopping abroad',
        body:
          'Ask the Seller for Express Shipping \n Even if Express Shipping isn/’t in the listing, you can contact the seller directly via private message and ask them to use express services.',
        isRead: false,
        sentAt: 1601163530583,
        labels: ['All', 'Inbox'],
      },
      {
        id: makeId(),
        from: 'Liel@example.com',
        subject: 'Sally Magrisso turns 93 today',
        body:
          'Maybe call her and wish her happy birthday? she miss you a lot',
        isRead: false,
        sentAt: 1581133930583,
        labels: ['All', 'Inbox'],
      },
      {
        id: makeId(),
        from: 'Ilai@italy.com',
        subject: 'bit by bit',
        body:
          'whatsuuuppppp?!?!?!???!?!?!?!',
        isRead: true,
        sentAt: 1611243930583,
        labels: ['All', 'Inbox'],
      },
      {
        id: makeId(),
        from: 'Matan@findMap.com',
        subject: 'Things are getting better',
        body:
          'I\'m almost done with the map, can you login and take a look?',
        isRead: false,
        sentAt: 1601353930583,
        labels: ['All', 'Inbox'],
      },
      {
        id: makeId(),
        from: 'Harel@my-design.com',
        subject: 'Look at my design!',
        body:
          'I\'ve finally done with the design for the gallery. Go check it at my repo. I hope you will like it as much as i am',
        isRead: false,
        sentAt: 1601173930583,
        labels: ['All', 'Inbox', 'Starred'],
      },
    ],
    labels: [
      'All',
      'Starred',
      'Inbox',
      'Sent',
    ]
  }
}

function query(filterBy) {
  if (!gMail) {
    gMail = _createDB()
    _saveToStorage()
  }
  if (!filterBy.txt && filterBy.mailStatus === '') {
    return Promise.resolve(gMail);
  }

  let { txt, mailStatus } = filterBy;
  const filteredBy = {}
  if (mailStatus === 'read') mailStatus = true
  if (mailStatus === 'unRead') mailStatus = false

  filteredBy.mails = gMail.mails.filter((mail) => {
    const filterRegex = new RegExp(txt, 'i');
    return (
      (filterRegex.test(mail.from) ||
        filterRegex.test(mail.subject) ||
        filterRegex.test(mail.body))
    );
  });
  if (mailStatus !== 'all') filteredBy.mails = filteredBy.mails.filter(mail => mail.isRead === mailStatus)
  filteredBy.labels = gMail.labels
  return Promise.resolve(filteredBy);
}

function sortMail(userData, sortedBy) {
  userData.mails.sort((a, b) => {
    return (new Date(a.sentAt) - new Date(b.sentAt)) * sortedBy
  })
  return Promise.resolve(userData)
}


function getMailById(mailId) {
  const mail = gMail.mails.find((mail) => mail.id === mailId);
  return Promise.resolve(mail);
}

function remove(mailId) {
  const mailIdx = gMail.mails.findIndex((mail) => mail.id === mailId);
  gMail.mails.splice(mailIdx, 1);
  _saveToStorage()
  return Promise.resolve(gMail.mails);
}

function toggleIsRead(mailId) {
  const chosenMailIdx = gMail.mails.findIndex((mail) => mail.id === mailId);
  gMail.mails[chosenMailIdx].isRead = !gMail.mails[chosenMailIdx].isRead;
  _saveToStorage()
  return Promise.resolve(gMail)
}

function sendMail(composedMail) {
  if (composedMail.id) {
    _replayMail(composedMail)
      .then(() => Promise.resolve())
  }
  return _createMail(composedMail)
    .then(() => Promise.resolve(gMail.mails))
}

function _replayMail(composedMail) {
  const mailIdx = gMail.mails.findIndex(mail => {
    return mail.id === composedMail.id
  })
  gMail.mails[mailIdx] = {
    ...gMail.mails[mailIdx],
    id: makeId(),
    from: 'me',
    subject: composedMail.subject,
    body: composedMail.body,
    sentAt: Date.now()
  }
  _saveToStorage()
}

function _createMail({ subject, body, from }) {
  console.log('in create mail');
  const newMail = {
    id: makeId(),
    from: 'Me',
    to: from,
    subject: subject,
    body: body,
    isRead: true,
    sentAt: Date.now(),
    labels: ['All', 'Sent'],
  }
  gMail.mails.push(newMail)
  _saveToStorage()
  return Promise.resolve('success')
}

function getByLabel(label) {
  const filteredMails = gMail.mails.filter(mail => {
    return mail.labels.includes(label)
  })
  return Promise.resolve(filteredMails)
}

function getLabels() {
  return gMail.labels
}

function removeLabel(mailId, userLabel) {
  const mailIdx = gMail.mails.findIndex(mail => {
    return mail.id === mailId
  })
  const labelIdx = gMail.mails[mailIdx].labels.findIndex(label => {
    return label === userLabel
  })
  gMail.mails[mailIdx].labels.splice(labelIdx, 1)
  _saveToStorage()
  return Promise.resolve(gMail.mails[mailIdx])
}

function addNewMailLabel(mailId, label) {
  const mailIdx = gMail.mails.findIndex(mail => {
    return mail.id === mailId
  })
  gMail.mails[mailIdx].labels.push(label)
  _saveToStorage()
  return Promise.resolve(gMail.mails[mailIdx])
}

function addNewLabel(newLabel) {
  gMail.labels.push(newLabel)
  _saveToStorage()
  return Promise.resolve(gMail.labels)
}

function getAvailableLabels() {
  return gMail.labels
}

function toggleMailStar(mailId) {
  const mailIdx = gMail.mails.findIndex(mail => {
    return mail.id === mailId
  })
  if (gMail.mails[mailIdx].labels.includes('Starred')) {
    const labelIdx = gMail.mails[mailIdx].labels.findIndex(label => label === 'Starred')
    gMail.mails[mailIdx].labels.splice(labelIdx)
  } else {
    gMail.mails[mailIdx].labels.push('Starred')
  }
  _saveToStorage()
  return Promise.resolve(gMail.mails)
}

function _saveToStorage() {
  storageService.saveToStorage(STORAGE_MAIL, gMail)
}

function _loaFromStorage() {
  return storageService.loadFromStorage(STORAGE_MAIL)
}