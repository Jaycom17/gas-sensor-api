import { History } from "../../domain/entities/history.entity";

export class ConvertToJS {
  static convertToJS(data: Object | any): History[] {
    const historyMap: Object | any = {};

    // Iteramos sobre cada binding (triple)
    data.results.bindings.forEach((binding: Object | any) => {
      const subject = binding.subject.value;
      const predicate = binding.predicate.value;
      const object = binding.object.value;

      // Inicializamos el objeto History si no existe para este sujeto
      if (!historyMap[subject]) {
        historyMap[subject] = {
          id: null,
          date: null,
          temperature: null,
          gas: null,
          reason: null,
        };
      }

      // Asignamos el valor correspondiente según el predicado
      if (predicate.endsWith("#id")) {
        historyMap[subject].id = object;
      } else if (predicate.endsWith("#date")) {
        historyMap[subject].date = object;
      } else if (predicate.endsWith("#temperature")) {
        historyMap[subject].temperature = parseInt(object, 10);
      } else if (predicate.endsWith("#gas")) {
        historyMap[subject].gas = parseInt(object, 10);
      } else if (predicate.endsWith("#reason")) {
        historyMap[subject].reason = object;
      }
    });

    // Convertimos el mapa de sujetos en una lista de instancias de History
    return Object.values(historyMap).map(
      (item: Object | any) =>
        new History(item.id, item.date, item.temperature, item.gas, item.reason)
    );
  }
}
