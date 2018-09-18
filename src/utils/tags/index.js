export default {
	state: {
		name: '',
		tagCreate: false,
		tagDelete: false,
		tagDeleteData: "",
		tagUse: false,
		tagUseData: "",
		tagUseArray: [],
		removeTag: false,
		removeTagData: "",
		removeTagArray: {},
		tagRules: [
			v => !!v || 'Name is required',
			v => v.length <= 10 || 'Name must be less than 10 characters'
		],
	},

	functions: {
		submitRemoveTag() {
			this.tagUseArray.map(item => {
				if (item.tags !== undefined) {
					item.tags = item.tags.filter(tag => tag !== this.tagUseData)
				}
			})
			this.tagUseArray.map(item => {
				if (item.tags !== undefined) {
					this.bank_gists = this.bank_gists.filter(gist => gist.id !== item.id)
					this.bank_gists.push(item)
				}
			})
			this.tagUseData = ""
			this.tagUseArray = []
			this.removeTag = false
		},
		tagRemove() {
			this.tagCreate = false
			this.tagDelete = false
			this.tagUse = false
			if (this.removeTag) {
				this.removeTag = false
			} else {
				this.removeTag = true
			}
		},
		submitTagUse() {
			this.tagUseArray.map(item => {
				if (item.tags === undefined) {
					item.tags = []
					item.tags.push(this.tagUseData)
				} else {
					item.tags.push(this.tagUseData)
				}
			})
			this.tagUseArray.map(item => {
				this.bank_gists = this.bank_gists.filter(gist => gist.id !== item.id)
				this.bank_gists.push(item)
			})
			this.tagUseData = ""
			this.tagUseArray = []
			this.tagUse = false
		},
		useTag() {
			this.tagCreate = false
			this.tagDelete = false
			this.removeTag = false
			if (this.tagUse) {
				this.tagUse = false
			} else {
				this.tagUse = true
			}
		},
		addBankGist(code, id) {
			if (this.tagUseArray.filter(item => item.id === id).length === 0) {
				this.tagUseArray.push(code)
			} else {
				this.tagUseArray = this.tagUseArray.filter(item => item.id !== id)
			}
		},
		submitDeleteTag() {
			this.items = this.items.filter(item => item !== this.tagDeleteData)
			this.tagDelete = false
		},
		deleteTag() {
			this.tagCreate = false
			this.tagUse = false
			this.removeTag = false
			if (this.tagDelete) {
				this.tagDelete = false
			} else {
				this.tagDelete = true
			}
		},
		submitTag() {
			this.tagCreate = false
			this.chips.push(this.tag)
			this.items.push(this.tag)
			this.tag = ""
		},
		createTag() {
			this.tagDelete = false
			this.tagUse = false
			this.removeTag = false
			if (this.tagCreate) {
				this.tagCreate = false
			} else {
				this.tagCreate = true
			}
		},
	}
}