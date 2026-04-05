export default function useRules() {
  function requiredField(): (v: string) => boolean | string {
    return (v: string): boolean | string =>
      (v && !!v && !!v.toString().trim()) || 'Field is required'
  }
  return {
    requiredField
  }
}
