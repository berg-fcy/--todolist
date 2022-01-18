
        Vue.config.productionTip = false 

        Vue.directive('select', {
            inserted: function(el) {
                el.select()
            }
        })
        const app = new Vue({
            el: '#app',
            data() {
                return {
                    title: '',
                    list: [],
                    editItem: {}
                }
            },
            
            created() {
                let todoLs = JSON.parse(localStorage.getItem('list'));
                this.list = todoLs ? todoLs : []
            },
            methods: {
                
                handleclick() {
                    if (this.title != '') {
                        this.list.push({
                            title: this.title,
                            done: false
                        })
                        this.title = ''
                        this.save()
                    }
                },
                
                setTodo(item) {
                    item.done = true
                    this.save()
                },
                
                setDone(item) {
                    item.done = false
                    this.save()
                },
                
                remove(item) {
                    let index = this.list.indexOf(item);
                    // console.log(index);
                    this.list.splice(index, 1);
                    this.save()
                },
                handelItem(item) {
                    this.editItem = item
                },
                
                add() {
                    if (this.editItem.title === '') return
                    this.editItem = {}
                    this.save()
                },
                
                save() {
                    if (this.list.length === 0) {
                        localStorage.removeItem('list')
                    } else {
                        localStorage.setItem('list', JSON.stringify(this.list))
                    }
                }

            },
            computed: {
                todoCount() {
                    return this.list.filter((item) => {
                        return !item.done
                    })
                },

                doneCount() {
                    return this.list.filter((item) => {
                        return item.done
                    })
                }

            }
        })
        function clear(){
            localStorage.clear();
            window.location.reload();
        }