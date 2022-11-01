import { useMemo, useEffect, useRef } from "react";
import { destroy, types, flow, toGenerator, cast } from "mobx-state-tree";
import { isEqual } from "lodash";
const useMst = (Model, configFactory, deps = []) => {
  const model = useMemo(() => {
    var _a;
    return Model.create(...(_a = configFactory == null ? void 0 : configFactory()) != null ? _a : []);
  }, [Model, ...deps]);
  useEffect(() => () => destroy(model), [model]);
  return model;
};
const useQuery = (Model, params) => {
  const ref = useRef({
    params: {}
  });
  const store = useMst(Model);
  const { fetchData } = store;
  useEffect(() => {
    return () => {
      var _a;
      (_a = ref.current.abortController) == null ? void 0 : _a.abort();
    };
  }, []);
  useEffect(() => {
    var _a;
    if (!isEqual(params, ref.current.params)) {
      ref.current.params = params;
      (_a = ref.current.abortController) == null ? void 0 : _a.abort();
      ref.current.abortController = new AbortController();
      fetchData(ref.current.params, ref.current.abortController.signal);
    }
  }, [params]);
  return store;
};
var RequestStatus = /* @__PURE__ */ ((RequestStatus2) => {
  RequestStatus2["PENDING"] = "pending";
  RequestStatus2["SUCCESS"] = "success";
  RequestStatus2["ERROR"] = "error";
  return RequestStatus2;
})(RequestStatus || {});
const createQueryModel = ({
  Model,
  onQuery,
  onResult
}) => {
  return Model.props({
    errMsg: types.maybeNull(types.frozen()),
    status: types.optional(types.enumeration(Object.values(RequestStatus)), "pending")
  }).volatile(() => ({
    abortController: new AbortController()
  })).views((t) => ({
    get loading() {
      return t.status === "pending";
    },
    get error() {
      return t.status === "error";
    }
  })).actions((t) => ({
    fetchData: flow(function* (params, signal) {
      t.status = "pending";
      try {
        const res = yield* toGenerator(onQuery(signal != null ? signal : t.abortController.signal, params));
        onResult(t, res);
        t.status = "success";
      } catch (err) {
        t.errMsg = err;
        t.status = "error";
      }
    })
  }));
};
const createListModel = ({
  Item,
  onQuery,
  onResult,
  feildName = "data"
}) => {
  return createQueryModel({
    Model: types.model({
      total: types.optional(types.number, 0),
      items: types.optional(types.array(Item), [])
    }),
    onQuery,
    onResult: (t, res) => {
      t.total = res.total;
      t.items = cast(res[`${feildName}`].map((i) => {
        var _a;
        return (_a = onResult == null ? void 0 : onResult(i)) != null ? _a : i;
      }));
    }
  });
};
export { RequestStatus, createListModel, createQueryModel, useMst, useQuery };
//# sourceMappingURL=index.es.js.map
