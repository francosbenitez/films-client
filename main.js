class ApiService {
    baseUrl = "http://localhost:3000/api/films"
    
    async getAll() {
        const response = await fetch(this.baseUrl);
        return response.json();
    }

    async create(pNewFilm) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pNewFilm)
        }
        const response = await fetch(this.baseUrl, requestOptions);
        return response.json();
    }

    async delete(pFilmId) {
        const requestOptions = {
            method: "DELETE"
        };
        const response = await fetch(`${this.baseUrl}/${pFilmId}`, requestOptions);
        return response.json()
    }

    async update(pFilmId) {
        const requestOptions = {
            method: "PUT"
        };
        const response = await fetch(`${this.baseUrl}/${pFilmId}`, requestOptions);
        return response.json();
    }
}

const app = new Vue({
    el: "#app",
    data: {
        films: [],
        apiService: null,
        newFilm: {},
        updateFilm: {}
    },
    async created() {
        this.apiService = new ApiService();
        this.films = await this.apiService.getAll();
    },
    methods: {
        onClickSendFilm: async function() {
            await this.apiService.create(this.newFilm);
            this.films = await this.apiService.getAll();
            this.newFilm = {};
        },
        onClickEliminar: async function(pFilmId) {
            await this.apiService.delete(pFilmId);
            this.films = await this.apiService.getAll();
        },
        onClickUpdate: async function(pFilmId) {
            await this.apiService.update(pFilmId);
            console.log(pFilmId)
        }
    }
})