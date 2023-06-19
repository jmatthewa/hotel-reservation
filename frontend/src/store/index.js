import { createStore } from 'vuex'

export default createStore({
  state: {
    rooms : [],
    room: {},
    adults : '1 Adult',
    kids : '0 Kids',
    total: 0,
    loading : false,
    newUsers: {
      fName: '',
      lName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    error: '',
    message: '',
    confirmation: false,
    startDate:null ,
    startMin: null,
    endDate: null ,
    totalDays: 1,
    user: null,
  },
  getters: {
    setRooms: state => state.rooms,
    user: state => state.user,
    startDate: state => state.startDate,
    endDate: state => state.endDate,
  
  },
  mutations: {
    setConfirmation( state, data) {
      state.confirmation = data
    },
    setAdults(state,data) {
      state.adults = data
    },
    setKids(state,data){
      state.kids = data
    },
    setTotalDays ( state, data ) {
      state.totalDays = data
    },
    setTotal(state,data){
      state.total = data
    },
    setLoading(state, data){
      state.loading = data
    },
    setStartMin(state, data) {
      state.startMin = data
    },
    setRooms(state, data){
      state.rooms = data
    },
    setRoom(state, data){
      state.room = data
    },
    user(state, user) {
      state.user = user
    },
    setStartDate(state, data) {
      state.startDate = data
    },
    setEndDate(state, data) {
      state.endDate = data
    }, setError ( state, data ) {
      state.error = data
    }, setMessage( state, data ) {
      state.message = data
    }
  },
  actions: {
    setStartDate( { commit }, date) {
      commit('setStartDate', date)
    },
    setEndDate( { commit }, date) {
      commit('setEndDate', date)
    },
    user({ commit }, user){
      commit('user', user)
    //  console.log(user);
    
    },

    async addNewUser({ commit, state }) {
      try {
        const requestOption = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            //"auth-token": state.token
          },
          body: JSON.stringify({
            fName: state.newUsers.fName,
            lName: state.newUsers.lName,
            email: state.newUsers.email,
            password: state.newUsers.password 
          })
        }
        await fetch('http://localhost:3000/users/new' , requestOption)
        .then((res) => res.json())
        .then((data) => {
          if(data.message){
     
            return commit('setMessage', data.message)
          } 
          commit('setError', data.error)
        })
      } catch (err){
        console.log(err)
      }

    },
    async fetchReservation(id) {
      try{
     
        await fetch(`http://localhost:3000/reservation/get/${id}`)
        .then(res => res.json())
        .then(data => {
         console.log(data);
      
        })
      } catch (err) {
        console.log('userId');
      }
    },

    async fetchRooms({ commit })  {
      try {
        await fetch('http://localhost:3000/rooms/')
        .then(res => res.json())
        .then(data => {
          commit('setRooms', data)
        })

      } catch(err) {
        console.error(err)
      }
    },
    async filteredRooms({ commit, state }) {
      try{
        await fetch('http://localhost:3000/rooms/')
        .then(res => res.json())
        .then(data => {
          const newRooms = data.filter((room) => {
            return state.total <= room.maxPerson
          })
          setTimeout(() => {
            commit('setRooms', newRooms)
            commit('setLoading', false)
          }, 2000)
        })      
      } catch(err){
        console.error(err)
      }
      
    },
    async fetchRoom({ commit }, id) {
      try {
        await fetch(`http://localhost:3000/rooms/get/${id}`)
        .then(res => res.json())
        .then(data => {
          commit('setRoom', data)
        })     
      } catch(err) {
        console.error(err)
      }
    },

    
  },
  modules: {
  }
})
