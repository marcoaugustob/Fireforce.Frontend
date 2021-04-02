import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: "root" })
export class CustomSweetService {
    constructor(private toast: ToastrService) { }

    deleteSwal(text: string, self: any, callback: any) {
        Swal.fire({
            title: 'Tem certeza que deseja excluir este item?',
            text: 'Você não poderá reverter isso!!',
            type: 'error',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apague!'
        }).then((result) => {
            if (result.value) {
                callback(self);
                this.toast.success(text);
            }
        });
    };
}  