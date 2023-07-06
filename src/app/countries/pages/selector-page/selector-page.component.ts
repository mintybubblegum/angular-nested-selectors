import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required ],
    country: ['', Validators.required ],
    borders: ['', Validators.required ],
  })

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
    
  }

  get regions(): Region[] {
    return this.countriesService.regions
  }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('')), //para hacer que el campo de país se reestablezca a --Select country-- cuando ya se ha hecho una busqueda. Sin esto, el campo aparece en blanco.
        switchMap( region => this.countriesService.getCountriesByRegion(region) ),
      )
      .subscribe( countries => {
        this.countriesByRegion = countries;
      });
  }

}
